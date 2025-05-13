import { Injectable, OnModuleInit } from '@nestjs/common';
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

      const existingUser = await this.userRepository.findOne({
        where: { email, id },
      });

      if (existingUser) {
        throw new Error('User with this email is already registered');
      }

      if (!fullName || !email || !password) {
        throw new Error('Full name, email and password are required');
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      const firstName = fullName.split(' ')[0];
      const lastName = fullName.split(' ')[1];
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.password = hashedPassword;
      user.email = email;
      user.id = id;
      const savedUser = await this.userRepository.save(user);
      const payload = { email: savedUser.email, sub: savedUser.id };
      const token = this.jwtService.sign(payload);

      return { ...savedUser, token };
    } catch (error) {
      console.error(error);
      throw new Error('Error during sign in');
    }
  }

  async logIn(authUserDto: AuthUserDto) {
    try {
      const { email, password } = authUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new Error('You are not registered');
      }
      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass) {
        throw new Error('Incorrect email or password');
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
      throw new Error('Error during log in');
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async removeAll() {
    await this.userRepository.query(`TRUNCATE users RESTART IDENTITY CASCADE;`);
    return 'Users are deleted';
  }
}
