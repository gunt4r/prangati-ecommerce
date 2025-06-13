import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Options,
  HttpStatus,
  HttpCode,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AdminGuard } from 'src/admin/admin.guard';
@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Post('login')
  login(@Body() authUserDto: AuthUserDto) {
    return this.authService.logIn(authUserDto);
  }
  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll() {
    return this.authService.findAll();
  }
  @Get('check')
  checkAuth(@Request() req) {
    return this.authService.validateToken(req);
  }
  // @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('deleteAllEntities')
  removeAll() {
    return this.authService.removeAll();
  }
  @Options('register')
  options() {
    return;
  }
}
