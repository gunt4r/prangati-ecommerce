import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColor } from 'src/models/Product_Colors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductColor])],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}
