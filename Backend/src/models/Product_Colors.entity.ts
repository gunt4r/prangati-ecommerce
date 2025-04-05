import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('product_colors')
export class ProductColor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  color: string;

  @Column({ nullable: false })
  @JoinColumn()
  product: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
