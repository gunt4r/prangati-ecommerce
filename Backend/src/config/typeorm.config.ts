import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../models/User.entity';
import { Newsletter } from 'src/models/Newsletter.entity';
import { Order } from '../models/Order.entity';
import { OrderItem } from '../models/OrderItem.entity';
import { Product } from '../models/Product.entity';
import { ViewedProducts } from '../models/ViewedProducts.entity';
import { Cart } from '../models/Cart.entity';
import { CartItem } from '../models/CartItem.entity';
import { FailedRequest } from 'src/models/failed-request.entity';
import { PasswordResetToken } from 'src/models/password-reset-token.entity';
import { Category } from 'src/models/Category.entity';
import { ProductColor } from 'src/models/Product_Colors.entity';
import { ProductSize } from 'src/models/Product_Sizes.entity';
import { Wishlist } from 'src/models/Wishlist.entity';
import { UploadedImage } from 'src/models/UploadImage';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
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
        Newsletter,
        Order,
        OrderItem,
        Product,
        Wishlist,
        ViewedProducts,
        Cart,
        CartItem,
        FailedRequest,
        PasswordResetToken,
        Category,
        ProductColor,
        ProductSize,
        UploadedImage,
      ],
    };
  }
}
