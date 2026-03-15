import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enums/role.enum';
import { CreateUserInput } from 'src/user/dto/create-user-input';
import { Repository } from 'typeorm';
import { AuthJwtPayload } from './auth-jwt-payload';
import { JwtUser } from './types/jwt-user';
import { AuthPayload } from './entities/auth-payload';
import { SignInInput } from './dto/signin.input';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async registerUser(input: CreateUserInput) {
        const { email } = input;

        const existingUser = await this.getUserByEmail(email);
        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
            return
        }

        const hashedPassword = await hash(input.password);
        const newUser = this.userRepository.create({
            ...input,
            password: hashedPassword,
            role: Role.USER,
        });
        return await this.userRepository.save(newUser);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOneBy({ email });
    }


    async validateLocalUser({ email, password }: SignInInput) {
        const user = await this.userRepository.findOneByOrFail({ email });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const passwordMatched = await verify(user.password, password);

        if (!passwordMatched)
            throw new UnauthorizedException('Invalid Credentials');

        return user;
    }

    async generateToken(userId: number) {
        const payload: AuthJwtPayload = {
            sub: {
                userId,
            },
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };
    }

    async login(user: User): Promise<AuthPayload> {
        const { accessToken } = await this.generateToken(user.id);

        return {
            userId: user.id,
            role: user.role,
            accessToken,
        };
    }

    async validateJwtUser(userId: number) {
        const user = await this.userRepository.findOneByOrFail({ id: userId });
        const jwtUser: JwtUser = {
            userId: user.id,
            role: user.role,
        };
        return jwtUser;
    }
}
