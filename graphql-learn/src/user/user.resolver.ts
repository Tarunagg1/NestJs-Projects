import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
    private readonly logger = new Logger(UserResolver.name)

    constructor(
        protected readonly userService: UserService,
    ) { }

    @Query(() => [User], { name: 'users' })
    async findAll() {
        return this.userService.findAll();
    }
}
