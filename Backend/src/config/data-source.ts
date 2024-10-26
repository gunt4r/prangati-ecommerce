import { User } from '../models/User.entity';
import { MailingList } from '../models/Newsletter.entity';
import { Order } from '../models/Order.entity';
import { OrderItem } from '../models/OrderItem.entity';
import { Product } from '../models/Product.entity';
import { ViewedProducts } from '../models/ViewedProducts.entity';
import { Cart } from '../models/Cart.entity';
import { CartItem } from '../models/CartItem.entity';
import { DataSource } from 'typeorm';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
  subscribers: [],
  migrations: [],
});
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => console.log(error));
