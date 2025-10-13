import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    createUser(data: RegisterDto) {
        return this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
            }
        });
    }

    getUserByEmail(email: string) {
        return this.prisma.user.findFirst({
            where: {
                email
            }
        });
    }
}
