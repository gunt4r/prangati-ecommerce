import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from 'src/cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User.entity';
import { Product } from 'src/models/Product.entity';
import { Cart } from 'src/models/Cart.entity';
import { Order } from 'src/models/Order.entity';
import { OrderItem } from 'src/models/OrderItem.entity';
import { Newsletter } from 'src/models/Newsletter.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Product,
      Cart,
      Order,
      OrderItem,
      Newsletter,
    ]),
    CartModule,
    MailModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
