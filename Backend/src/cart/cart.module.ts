import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from 'src/models/Cart.entity';
import { User } from 'src/models/User.entity';
import { Product } from 'src/models/Product.entity';
import { CartItem } from 'src/models/CartItem.entity';
import { UploadImagesModule } from 'src/upload-images/upload-images.module';
import { WishlistModule } from 'src/wishlist/wishlist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, User, Product, CartItem]),
    UploadImagesModule,
    WishlistModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
