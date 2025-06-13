import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/models/Product.entity';
import { Category } from 'src/models/Category.entity';
import { UploadImagesModule } from 'src/upload-images/upload-images.module';
import { ProductColor } from 'src/models/Product_Colors.entity';
import { ProductSize } from 'src/models/Product_Sizes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductColor, ProductSize]),
    UploadImagesModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
