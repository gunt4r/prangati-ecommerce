import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './Product.entity';

@Entity('product_colors')
export class ProductColor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  color: string;

  @ManyToOne(() => Product, (product) => product.colors)
  product: Product;
}
