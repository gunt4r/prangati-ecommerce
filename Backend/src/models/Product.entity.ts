import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Category } from './Category.entity';
// import { ProductColor } from './Product_Colors.entity';
// import { ProductSize } from './Product_Sizes.entity';
import { Wishlist } from './Wishlist.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column({ default: 0 })
  stock: number;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: false })
  isFeatured: boolean;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlists: Wishlist[];

  @CreateDateColumn()
  createdAt: Date;
}
