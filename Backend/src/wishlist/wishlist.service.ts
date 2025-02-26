import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { In, Repository } from 'typeorm';
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

    if (!userID) {
      throw new BadRequestException('User ID is missing');
    }
    const repeatedEntries = await this.wishlistRepository.find({
      where: { product: { id: productID }, user: { id: userID } },
    });
    if (repeatedEntries.length != 0) {
      throw new Error('This product is already added to wishlist');
    }
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });

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

  async findAll(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('User not found');

    const wishlistItems = await this.wishlistRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    if (!wishlistItems.length) {
      return [];
    }

    const productIds = wishlistItems.map((item) => item.product.id);

    const products = await this.productRepository.find({
      where: { id: In(productIds) },
    });

    return products;
  }
  async findOne(dto: CreateWishlistDto) {
    const entry = await this.wishlistRepository.findOne({
      where: {
        product: { id: dto.productID },
        user: { id: dto.userID },
      },
    });
    if (!entry) {
      throw new BadRequestException('Wishlist not found');
    }
    return HttpStatus.OK;
  }
  async remove(deleteFromWishlist: CreateWishlistDto) {
    const { productID, userID } = deleteFromWishlist;
    const wishlist = await this.wishlistRepository.findOne({
      where: { product: { id: productID }, user: { id: userID } },
    });
    if (!wishlist) {
      throw new BadRequestException('Wishlist not found');
    }
    return this.wishlistRepository.remove(wishlist);
  }
}
