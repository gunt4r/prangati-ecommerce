import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const {
      id,
      firstName,
      lastName,
      email,
      city,
      postalCode,
      address,
      country,
      phone,
    } = createUserDto;
    const userEmail = await this.userRepository.findOne({
      where: { email: email },
    });
    if (userEmail) {
      return new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const userID = await this.userRepository.findOne({ where: { id: id } });
    if (userID) {
      userID.firstName = firstName;
      userID.lastName = lastName;
      userID.email = email;
      userID.city = city;
      userID.postalCode = postalCode;
      userID.address = address;
      userID.country = country;
      userID.phone = phone;
      await this.userRepository.save(userID);
      return { message: 'User created successfully id', id: id };
    }
    try {
      const user = new User();
      user.id = id;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.city = city;
      user.postalCode = postalCode;
      user.address = address;
      user.country = country;
      user.phone = phone;
      await this.userRepository.save(user);
      return { message: 'User created successfully', id: id };
    } catch (error) {
      throw new HttpException(
        `Error saving user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async addUUIDtoDatabase(uuid: string) {
    const user = await this.userRepository.findOne({ where: { id: uuid } });
    if (user) {
      return { message: 'User already exists', id: uuid, exists: true };
    }
    try {
      const user = new User();
      user.id = uuid;
      user.firstName = null;
      user.lastName = null;
      user.email = null;
      user.password = null;

      await this.userRepository.save(user);
      return { message: 'User created successfully', id: uuid };
    } catch (error) {
      throw new HttpException(
        `Error saving user:${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      return { message: 'Did not found the user' };
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const {
      firstName,
      lastName,
      email,
      city,
      postalCode,
      address,
      country,
      phone,
    } = updateUserDto;

    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      return { message: 'Did not found the user' };
    }

    if (email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    try {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.city = city;
      user.postalCode = postalCode;
      user.address = address;
      user.country = country;
      user.phone = phone;
      await this.userRepository.save(user);
      return { message: 'User updated successfully' };
    } catch (error) {
      throw new HttpException(
        `Error saving settings: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
