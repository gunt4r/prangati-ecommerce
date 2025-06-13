import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadImagesService } from './upload-images.service';
import { UploadImagesController } from './upload-images.controller';
import { UploadedImage } from 'src/models/UploadImage';

@Module({
  imports: [TypeOrmModule.forFeature([UploadedImage])],
  controllers: [UploadImagesController],
  providers: [UploadImagesService],
  exports: [UploadImagesService],
})
export class UploadImagesModule {}
