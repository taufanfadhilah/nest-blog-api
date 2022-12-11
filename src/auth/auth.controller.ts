import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const user = await this.authService.register(registerDto);
    if (!user) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Email already exists',
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
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
