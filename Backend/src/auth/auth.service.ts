import {
  Injectable,
  OnModuleInit,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from 'src/models/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { ResponseWithCookie } from 'src/utils/interfaces';
@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {}

  private seAuthCookies(
    res: ResponseWithCookie,
    accessToken: string,
    refreshToken: string,
  ) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };

    res.cookie('access_token', accessToken, {
      ...cookieOptions,
      maxAge: 10 * 60 * 1000,
    });
    res.cookie('refresh_token', refreshToken, {
      ...cookieOptions,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
  }
  async register(createAuthDto: CreateAuthDto, res: ResponseWithCookie) {
    try {
      const { id, fullName, email, password } = createAuthDto;

      if (!fullName || !email || !password) {
        throw new BadRequestException(
          'Full name, email and password are required',
        );
      }

      if (password.length < 8) {
        throw new BadRequestException(
          'Password must be at least 8 characters long',
        );
      }

      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new BadRequestException(
          'User with this email is already registered',
        );
      }

      const fullNameParts = fullName.split(' ');
      const firstName = fullNameParts[0] || '';
      const lastName = fullNameParts[1] || '';

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = this.userRepository.create({
        firstName,
        lastName,
        password: hashedPassword,
        email,
        id,
      });
      const savedUser = await this.userRepository.save(user);

      if (!savedUser) {
        throw new InternalServerErrorException('Failed to save user');
      }

      const payload = {
        email: savedUser.email,
        sub: savedUser.id,
        user_role: savedUser.role,
      };

      const access_token = this.jwtService.sign(payload, {
        expiresIn: '10m',
      });
      const refresh_token = this.jwtService.sign(payload, {
        expiresIn: '2d',
      });

      this.seAuthCookies(res, access_token, refresh_token);

      return { ...savedUser };
    } catch (error) {
      console.error('Error during sign in:', error.message);
      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        return error;
      }
      throw new InternalServerErrorException('Error during sign in');
    }
  }

  async logIn(authUserDto: AuthUserDto, res: ResponseWithCookie) {
    try {
      const { email, password } = authUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new BadRequestException('You are not registered');
      }
      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass) {
        throw new BadRequestException('Incorrect email or password');
      }

      const payload = {
        email: user.email,
        sub: user.id,
        user_role: user.role,
      };

      const access_token = this.jwtService.sign(payload);
      const refresh_token = this.jwtService.sign(payload);
      this.seAuthCookies(res, access_token, refresh_token);

      return { ...user };
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        return error;
      }
      throw new InternalServerErrorException('Error during log in');
    }
  }

  async validateToken(req: any) {
    try {
      const token = req.cookies?.access_token;
      if (!token) {
        throw new NotFoundException('Token not found');
      }
      const payload = this.jwtService.verify(token);
      if (!payload) {
        throw new NotFoundException('Token is invalid');
      }
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (e) {
      if (e instanceof NotFoundException) {
        return e;
      }
      if (e instanceof BadRequestException) {
        return e;
      }
      console.error(e);
      throw new BadRequestException('Error validating token');
    }
  }

  async refresh(res: ResponseWithCookie) {
    console.log(res);
    const token = res.cookies?.refresh_token;

    if (!token) throw new UnauthorizedException('Refresh token missing');

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) throw new UnauthorizedException('User not found');

      const access_token = this.jwtService.sign(payload);
      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      return { message: 'Refreshed the access token successfully' };
    } catch (error) {
      throw new UnauthorizedException(`Invalid refresh token ${error}`);
    }
  }
  async logout(res: ResponseWithCookie) {
    console.log(res);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }
  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch users ${error}`);
    }
  }

  async removeAll() {
    try {
      await this.userRepository.query(
        `TRUNCATE users RESTART IDENTITY CASCADE;`,
      );
      return 'Users were deleted';
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete users ${error}`);
    }
  }
}
