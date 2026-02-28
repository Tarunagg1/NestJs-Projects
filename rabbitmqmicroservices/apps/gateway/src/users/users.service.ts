import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

export interface UserAuthDto {
    clerkUserId: string;
    email: string;
    name: string;
}

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async upsertAuthuser(input: UserAuthDto) {
        const { clerkUserId, email, name } = input;

        const user = await this.userModel.findOneAndUpdate(
            { clerkUserId },
            { email, name, lastSeenAt: new Date() },
            { $setOnInsert: { role: 'user' }, new: true, upsert: true }
        );

        return user;
    }

    async findByClerkUserId(clerkUserId: string) {
        return this.userModel.findOne({ clerkUserId });
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }
}
