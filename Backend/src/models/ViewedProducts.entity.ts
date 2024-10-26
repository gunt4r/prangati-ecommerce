import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User.entity';
import { Product } from './Product.entity';

@Entity('viewed_products')
export class ViewedProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.viewedProducts)
  user: User;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  viewedAt: Date;
}
