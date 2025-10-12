import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/registeruser.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('register')

    async register(@Body() registerUserDTO: RegisterDTO) {
        const token = await this.authService.register(registerUserDTO);
        return { accessToken: token };
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getUserProfile(@Request() req) {
        return {
            message: req.user
        }
    }
}