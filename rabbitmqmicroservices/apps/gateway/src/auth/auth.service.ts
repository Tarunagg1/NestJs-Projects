import { createClerkClient, verifyToken } from '@clerk/backend';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserContext } from './auth.types';

@Injectable()
export class AuthService {
    private readonly clerk = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    });


    private jwtVerifyOptions(): Record<string, any> {
        return {
            // Add any specific options for JWT verification if needed
            secretKey: process.env.CLERK_SECRET_KEY,
        };
    }

    async verifyAndBuildToken(token: string): Promise<UserContext> {
        try {
            const jwtPayload: any = await verifyToken(token, this.jwtVerifyOptions());
            const userId = jwtPayload.sub;

            if (!userId) {
                throw new UnauthorizedException('Invalid token: Missing user ID');
            }

            const role: 'admin' | 'user' = jwtPayload.role;
            const emailFromToken = jwtPayload?.email ?? jwtPayload?.email_address ?? jwtPayload?.primaryEmailAddress;
            const nameFromToken = jwtPayload?.name ?? jwtPayload?.fullName ?? jwtPayload?.usernaame;

            // const user = await this.clerk.users.getUser(userId);
            if (emailFromToken && nameFromToken) {
                return {
                    clerkUserId: userId,
                    email: emailFromToken,
                    name: nameFromToken,
                    role: role,
                };
            }

            const user = await this.clerk.users.getUser(userId);

            const primaryEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? '';
            const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || primaryEmail || userId;

            return {
                clerkUserId: userId,
                email: primaryEmail,
                name: fullName,
                role: role,
            };
        } catch (error) {
            console.log(error);

            throw new UnauthorizedException('Invalid token');
        }
    }
}
