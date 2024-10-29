import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { User } from 'src/models/User.entity';
import { TypeOrmConfigService } from 'src/config/typeorm.config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  private userRepository: Repository<User>;

  constructor(
    private readonly jwtService: JwtService,
    private readonly typeOrmConfigService: TypeOrmConfigService,
  ) {}

  async onModuleInit() {
    const dataSource = this.typeOrmConfigService.createDataSource();
    await dataSource.initialize();
    this.userRepository = dataSource.getRepository(User);
  }

  async signIn(CreateAuthDto: CreateAuthDto) {
    try {
      const { fullName, email, password } = CreateAuthDto;

      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new Error('User with this email is already registered');
      }

      if (!fullName || !email || !password) {
        throw new Error('Full name,email and password are required');
      }
      const firstName = fullName.split(' ')[0];
      const lastName = fullName.split(' ')[1];
      const saltRounds = 10;
      const salt = await bcrypt.hash(password, saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.password = hashedPassword;
      user.email = email;
      const savedUser = await this.userRepository.manager.save(user);
      const payload = { email: savedUser.email, sub: savedUser.id };
      const token = this.jwtService.sign(payload);

      return { ...savedUser, token };
    } catch (error) {
      console.error(error);
    }
  }

  async logIn(AuthUserDto: AuthUserDto) {
    try {
      const { email, password } = AuthUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new Error('You are not registered');
      }
      const validPass = bcrypt.compare(password, user.password);

      if (!validPass) {
        throw new Error('Incorrect email or password');
      }

      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);
      return { ...user, token };
    } catch (error) {
      console.error(error);
    }
  }
  async findAll() {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async removeAll() {
    await this.userRepository.query(`TRUNCATE users RESTART IDENTITY CASCADE;`);
    return 'Users are deleted';
  }
}
