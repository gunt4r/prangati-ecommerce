import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './Product.entity';

@Entity('product_sizes')
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: string;

  @ManyToOne(() => Product, (product) => product.sizes)
  product: Product;
}
