
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { IS_PUBLIC_KEY } from './public.decorator';
import { UserContext } from './auth.types';
import { REQUIRED_ROLE_KEY } from './admin.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const req = context.switchToHttp().getRequest() as any;
        const authHeader = req.headers['authorization'];
        if (!authHeader || typeof authHeader !== 'string') {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            const identifyAuthUser = await this.authService.verifyAndBuildToken(token);

            const dbUser = await this.userService.upsertAuthuser({
                clerkUserId: identifyAuthUser.clerkUserId,
                email: identifyAuthUser.email,
                name: identifyAuthUser.name
            })

            const user = {
                ...identifyAuthUser,
                role: dbUser.role
            }

            req.user = user as UserContext;

            const requiredRole = this.reflector.getAllAndOverride<string>(REQUIRED_ROLE_KEY, [
                context.getHandler(),
                context.getClass(),
            ])


            if (requiredRole === 'admin' && user.role !== 'admin') {
                throw new UnauthorizedException('Admin role required');
            }

            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
