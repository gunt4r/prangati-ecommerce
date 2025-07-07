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

@Entity('product_colors')
export class ProductColor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 20 })
  name: string;

  @Column({ nullable: true, unique: true, length: 20 })
  hexCode: string;

  @ManyToMany(() => Product, (product) => product.colors)
  @JoinTable({
    name: 'product_productColors',
    joinColumn: {
      name: 'product_color_id',
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
