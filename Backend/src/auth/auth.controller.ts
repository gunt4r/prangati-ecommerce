import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Options,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthUserDto } from 'src/dto/auth-user.dto';
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
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete('deleteAllEntities')
  removeAll() {
    return this.authService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  @Options('register')
  options() {
    return;
  }
}
