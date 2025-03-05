import { Module } from '@nestjs/common';
import { UploadImagesService } from './upload-images.service';
import { UploadImagesController } from './upload-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedImage } from 'src/models/UploadImage';

@Module({
  imports: [TypeOrmModule.forFeature([UploadedImage])],
  controllers: [UploadImagesController],
  providers: [UploadImagesService],
  exports: [UploadImagesService],
})
export class UploadImagesModule {}
