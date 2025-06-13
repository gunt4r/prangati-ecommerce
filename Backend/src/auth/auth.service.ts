/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpStatus,
  Injectable,
  OnModuleInit,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { User } from 'src/models/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/dto/auth-user.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {}

  async signIn(createAuthDto: CreateAuthDto) {
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

      const payload = { email: savedUser.email, sub: savedUser.id };
      const token = this.jwtService.sign(payload);

      return { ...savedUser, token };
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

  async logIn(authUserDto: AuthUserDto) {
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
        isAdmin: user.isAdmin,
      };
      const token = this.jwtService.sign(payload);
      return { ...user, token };
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
      const token = this.extractTokenFromHeaders(req.headers.authorization);
      if (!token) {
        throw new NotFoundException('Token not found');
      }
      const payload = this.jwtService.verify(token);
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
      throw new BadRequestException(e.message);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async removeAll() {
    try {
      await this.userRepository.query(
        `TRUNCATE users RESTART IDENTITY CASCADE;`,
      );
      return 'Users were deleted';
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete users');
    }
  }

  private extractTokenFromHeaders(headers: string) {
    const [type, token] = headers?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
