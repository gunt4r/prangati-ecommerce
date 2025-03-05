import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Delete,
  UploadedFiles,
} from '@nestjs/common';
import { UploadImagesService } from './upload-images.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload-images')
export class UploadImagesController {
  constructor(private readonly uploadImagesService: UploadImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.uploadImagesService.uploadFile(file);
  }
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('images'))
  uploadMultiple(@UploadedFiles() images: Express.Multer.File[]) {
    return this.uploadImagesService.uploadMultipleFiles(images);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadImagesService.getImage(id);
  }
  // @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete()
  removeAll() {
    return this.uploadImagesService.removeAll();
  }
}
