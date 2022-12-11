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
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { IUser } from './interfaces';

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
  async detail(@Request() req) {
    return {
      success: true,
      message: 'Get current user',
      data: req.user,
    };
  }
}