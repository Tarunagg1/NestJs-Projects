import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private userService: UserService, private jwtService: JwtService) { }

    async register(data: RegisterDto) {
        const user = await this.userService.getUserByEmail(data.email);
        if (user) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newCreatedUser = await this.userService.createUser({ ...data, password: hashedPassword });

        this.logger.log(`New user created: ${newCreatedUser.email}`);

        const payload = { sub: newCreatedUser.id, email: newCreatedUser.email };
        const token = await this.jwtService.signAsync(payload);

        return { token };
    }

    async login(data: LoginDto) {
        const user = await this.userService.getUserByEmail(data.email);
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);
        return { token };
    }
}
