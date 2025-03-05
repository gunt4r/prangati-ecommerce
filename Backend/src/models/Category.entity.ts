import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './Product.entity';
import { UploadedImage } from './UploadImage';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cardType: 'tall' | 'wide' | 'normal';

  @OneToOne(() => UploadedImage, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  image: UploadedImage;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
