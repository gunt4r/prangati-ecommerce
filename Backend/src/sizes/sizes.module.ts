import { forwardRef, Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSize } from 'src/models/Product_Sizes.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductSize]),
    forwardRef(() => ProductModule),
  ],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}
