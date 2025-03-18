import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUserDto } from './dto/sing-user.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() request: { user: { id: number } }) {
    return this.authService.getProfile(request.user.id)
  }

  @Post('login')
  login(@Body() dto: SignUserDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: SignUserDto) {
    return this.authService.register(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() responce: Response) {
    return this.authService.logout(responce);
  }
}
