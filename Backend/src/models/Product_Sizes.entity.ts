import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToOne,
  // JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
// import { Product } from './Product.entity';

@Entity('product_sizes')
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  size: string;

  @Column({ nullable: false })
  @JoinColumn()
  product: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
