import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './Category.entity';
// import { ProductColor } from './Product_Colors.entity';
// import { ProductSize } from './Product_Sizes.entity';
import { Wishlist } from './Wishlist.entity';
import { UploadedImage } from './UploadImage';
import { genderEnum } from 'src/utils/enums';
import { ProductColor } from './Product_Colors.entity';
import { ProductSize } from './Product_Sizes.entity';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => UploadedImage, (UploadedImage) => UploadedImage.product)
  images: UploadedImage[];

  @ManyToMany(() => ProductColor, (productColor) => productColor.products)
  @JoinTable({
    name: 'product_product_colors',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_color_id',
      referencedColumnName: 'id',
    },
  })
  colors: ProductColor[];

  @ManyToMany(() => ProductSize, (productSize) => productSize.products)
  @JoinTable({
    name: 'product_productSize',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_size_id',
      referencedColumnName: 'id',
    },
  })
  sizes: ProductSize[];
  @Column({
    type: 'enum',
    enum: genderEnum,
    default: genderEnum.UNISEX,
  })
  gender: genderEnum;

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
