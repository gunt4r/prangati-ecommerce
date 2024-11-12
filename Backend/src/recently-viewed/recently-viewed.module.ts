import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecentlyViewedService } from './recently-viewed.service';
import { ViewedProducts } from '../models/ViewedProducts.entity';
import { ViewedProductsController } from './recently-viewed.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ViewedProducts])],
  providers: [RecentlyViewedService],
  controllers: [ViewedProductsController],
  exports: [RecentlyViewedService],
})
export class RecentlyViewedModule {}
