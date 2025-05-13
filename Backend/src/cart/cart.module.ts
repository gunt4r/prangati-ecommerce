import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/models/Cart.entity';
import { User } from 'src/models/User.entity';
import { Product } from 'src/models/Product.entity';
import { CartItem } from 'src/models/CartItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Product, CartItem])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
