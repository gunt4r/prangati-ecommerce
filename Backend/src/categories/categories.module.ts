import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from 'src/models/Category.entity';
import { UploadImagesModule } from 'src/upload-images/upload-images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UploadImagesModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
