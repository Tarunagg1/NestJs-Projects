import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { LoginDto, RegisterDto } from '@app/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) { }

  @Get()
  async root() {
    return { message: 'Auth Service is running' };
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authServiceService.register(dto.email, dto.password, dto.name);
    // Dummy data for illustration; in real scenarios, get these from request body
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authServiceService.login(dto.email, dto.password);
    // Dummy data for illustration; in real scenarios, get these from request body
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req: { user: { userId: string } }) {
    return this.authServiceService.getProfile(req.user.userId);
  }

}
