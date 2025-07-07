import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterRemove,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import path from 'path';
import * as fs from 'fs';
import { Product } from './Product.entity';

@Entity('uploadimage')
export class UploadedImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  originalName: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
  @AfterRemove()
  removeFile() {
    const filePath = path.join(process.cwd(), 'public', this.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
