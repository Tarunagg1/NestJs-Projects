export interface IUser {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface IAutUser extends Pick<IUser, 'id' | 'email'> {
    roles: string[];
}