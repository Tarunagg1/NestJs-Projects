import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/registeruser.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    async register(userData: RegisterDTO) {
        const hashPass = await bcrypt.hash(userData.password, 10)
        const user = await this.userService.createUser({ ...userData, password: hashPass });

        const payload = { sub: user._id }

        const token = await this.jwtService.signAsync(payload)
        return token;
    }
}
