import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { User } from '../models/User.entity';
import { MailingList } from '../models/Newsletter.entity';
import { Order } from '../models/Order.entity';
import { OrderItem } from '../models/OrderItem.entity';
import { Product } from '../models/Product.entity';
import { ViewedProducts } from '../models/ViewedProducts.entity';
import { Cart } from '../models/Cart.entity';
import { CartItem } from '../models/CartItem.entity';

@Injectable()
export class TypeOrmConfigService {
  constructor(private configService: ConfigService) {}

  createDataSource(): DataSource {
    return new DataSource({
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      synchronize: true,
      logging: true,
      entities: [
        User,
        MailingList,
        Order,
        OrderItem,
        Product,
        ViewedProducts,
        Cart,
        CartItem,
      ],
    });
  }
}
