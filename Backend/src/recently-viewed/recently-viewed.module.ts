import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecentlyViewedService } from './recently-viewed.service';
import { ViewedProducts } from '../models/ViewedProducts.entity';
import { ViewedProductsController } from './recently-viewed.controller';
import { UploadImagesModule } from 'src/upload-images/upload-images.module';
import { Product } from 'src/models/Product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ViewedProducts, Product]),
    UploadImagesModule,
  ],
  providers: [RecentlyViewedService],
  controllers: [ViewedProductsController],
  exports: [RecentlyViewedService],
})
export class RecentlyViewedModule {}
