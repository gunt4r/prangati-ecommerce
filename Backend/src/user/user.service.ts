import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/models/User.entity';
import { CartService } from 'src/cart/cart.service';
import { validateCreateOrder } from 'src/order/order.validator';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cartService: CartService,
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
      const user = this.userRepository.create({
        id,
        firstName,
        lastName,
        email,
        city,
        postalCode,
        address,
        country,
        phone,
      });
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
      const user = this.userRepository.create({
        id: uuid,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
      });

      await this.userRepository.save(user);
      await this.cartService.createCart(uuid.toString());
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

  async findAll() {
    const users = await this.userRepository.find();
    if (!users) {
      return { message: 'Did not found the users' };
    }
    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    console.log('updateuser ', updateUserDto);
    const errors = validateCreateOrder(updateUserDto);
    if (errors) {
      console.log(errors);
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
    const { address, ...rest } = updateUserDto as any;

    const user = await this.userRepository.preload({
      id,
      ...rest,
      address: address?.addressLine1,
      city: address?.city,
      postalCode: address?.zip,
      country: address?.country,
    });
    console.log('user ', user);
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        `Error updating user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
