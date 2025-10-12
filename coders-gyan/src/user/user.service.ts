import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDTO } from 'src/auth/dto/registeruser.dto';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async getUserByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    async createUser(userData: RegisterDTO) {
        try {
            const user = await this.userModel.create(userData);
            return user;
        } catch (error: unknown) {
            const e = error as { code?: number };
            if (e.code === 11000) {
                throw new ConflictException("Email is already taken")
            }
            throw error
        }
    }
}
