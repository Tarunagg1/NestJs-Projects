import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { Logger, UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user-input';
import { UpdateUserInput } from './dto/update-user';
import { GqlJwtGuardGuard } from 'src/auth/guards/gql-jwt-guard/gql-jwt-guard.guard';

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

    @Query(() => User, { name: 'getUserByID' })
    getUserByID(@Args('id', { type: () => Int }) id: number) {
        return this.userService.findOne(id);
    }

    @ResolveField(() => Profile, { name: 'profile' })
    async getProfile(@Parent() user: User) {
        this.logger.debug(`Resolving profile for user ${user.id}`);
        return await user.profile;
    }

    @Mutation(() => User)
    createUser(@Args('CreateUserInput') input: CreateUserInput) {
        return this.userService.create(input);
    }


    @UseGuards(GqlJwtGuardGuard)
    @Mutation(() => User)
    updateUser(@Args('id', { type: () => Int }) id: number, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(id, updateUserInput);
    }

    @Mutation(() => Boolean)
    deleteUser(@Args('id', { type: () => Int }) id: number) {
        return this.userService.remove(id);
    }
}
