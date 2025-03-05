import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadedImage } from 'src/models/UploadImage';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UploadImagesService {
  constructor(
    @InjectRepository(UploadedImage)
    private imageRepository: Repository<UploadedImage>,
  ) {}
  async uploadFile(file: Express.Multer.File): Promise<UploadedImage> {
    if (!file?.mimetype) throw new Error('Invalid file');
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit');
    }

    const uploadDir = path.join(
      process.cwd(),
      '..',
      'prangati',
      'public',
      'uploads',
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const fullPath = path.join(uploadDir, fileName);

    fs.writeFileSync(fullPath, file.buffer);
    if (!fs.existsSync(fullPath)) {
      throw new Error('File was not saved');
    }
    return this.imageRepository.save({
      path: `/uploads/${fileName}`,
      originalName: file.originalname,
    });
  }
  async uploadMultipleFiles(
    files: Express.Multer.File[],
  ): Promise<UploadedImage[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file));
    return Promise.all(uploadPromises);
  }

  async getImagesByIds(ids: string[]): Promise<UploadedImage[]> {
    const images = await this.imageRepository.findByIds(ids);
    if (images.length !== ids.length) {
      throw new NotFoundException('Some images not found');
    }
    return images;
  }
  async getImage(id: string) {
    const image = await this.imageRepository.findOne({ where: { id: id } });
    if (!image) throw new NotFoundException('Image not found');
    return image;
  }

  async removeAll() {
    await this.imageRepository.query(
      `TRUNCATE uploadimage RESTART IDENTITY CASCADE;`,
    );
    return 'Images were deleted';
  }
}
