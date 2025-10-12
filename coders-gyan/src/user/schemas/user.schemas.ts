
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLE } from '../types/user.types.';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({
        required: true
    })
    fname: string;

    @Prop({
        required: true
    })
    lname: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop()
    password: string;

    @Prop({
        type: String,
        enum: Object.values(ROLE),
        default: ROLE.Student
    })
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User);
