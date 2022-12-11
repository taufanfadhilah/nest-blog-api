import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      success: true,
      message: 'User registered successfully',
      data: user,
    };
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    return {
      success: true,
      message: 'Login success',
      data: req.user,
    };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async detail(@Request() req) {
    return {
      success: true,
      message: 'Get current user',
      data: req.user,
    };
  }
}
