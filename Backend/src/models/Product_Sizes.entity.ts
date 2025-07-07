import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from './Product.entity';

@Entity('product_sizes')
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 20 })
  size: string;

  @ManyToMany(() => Product, (product) => product.sizes)
  @JoinTable({
    name: 'product_productSize',
    joinColumn: {
      name: 'product_size_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
