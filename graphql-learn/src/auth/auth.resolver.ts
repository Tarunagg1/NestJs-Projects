import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user-input';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signin.input';
import { AuthPayload } from './entities/auth-payload';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
    ) { }
    @Mutation(() => User)
    signUp(@Args('input') input: CreateUserInput) {
        return this.authService.registerUser(input);
    }

    @Mutation(() => AuthPayload)
    async signIn(@Args('input') input: SignInInput) {
        const user = await this.authService.validateLocalUser(input);
        return this.authService.login(user);
    }
}
