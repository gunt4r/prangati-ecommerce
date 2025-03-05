import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterRemove,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import path from 'path';
import * as fs from 'fs';

@Entity('uploadimage')
export class UploadedImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  originalName: string;
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
