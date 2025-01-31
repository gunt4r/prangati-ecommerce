import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { ProductImage } from './Product_Images.entity';
import { ProductColor } from './Product_Colors.entity';
import { ProductSize } from './Product_Sizes.entity';
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

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @OneToMany(() => ProductColor, (color) => color.product)
  colors: ProductColor[];

  @OneToMany(() => ProductSize, (size) => size.product)
  sizes: ProductSize[];

  @Column({ default: 0 })
  stock: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlists: Wishlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
