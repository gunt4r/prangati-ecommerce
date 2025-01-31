import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../models/Product.entity';
import { Wishlist } from '../models/Wishlist.entity';
import { User } from '../models/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Product, User])],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {}
