import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/Product.entity';
import { Wishlist } from '../models/Wishlist.entity';
import { User } from '../models/User.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createWishlistDto: CreateWishlistDto) {
    const { userID, productID } = createWishlistDto;

    const user = await this.userRepository.findOne({ where: { id: userID } });

    const product = await this.productRepository.findOne({
      where: { id: productID },
    });
    if (!user || !product) {
      throw new Error('User or Product not found');
    }

    const wishlist = this.wishlistRepository.create({
      user,
      product,
    });
    return this.wishlistRepository.save(wishlist);
  }

  findAll() {
    return `This action returns all wishlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
