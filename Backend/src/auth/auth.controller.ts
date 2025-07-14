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
  Res,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { userRoles } from 'src/utils/enums';
@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res,
  ) {
    return this.authService.register(createAuthDto, res);
  }
  @Patch('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRoles.ADMIN)
  update() {
    return { message: 'update' };
  }
  @Post('login')
  login(@Body() authUserDto: AuthUserDto, @Res({ passthrough: true }) res) {
    return this.authService.logIn(authUserDto, res);
  }
  @Post('refresh')
  refresh(@Res({ passthrough: true }) res) {
    return this.authService.refresh(res);
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res) {
    return this.authService.logout(res);
  }
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.authService.findAll();
  }
  @Get('check')
  checkAuth(@Request() req) {
    return this.authService.validateToken(req);
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('deleteAllEntities')
  removeAll() {
    return this.authService.removeAll();
  }
  @Options('register')
  options() {
    return;
  }
}
