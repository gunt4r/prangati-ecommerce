import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/models/Category.entity';
import { UploadImagesModule } from 'src/upload-images/upload-images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UploadImagesModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
