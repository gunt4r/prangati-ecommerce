import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UsePipes } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ) {
    console.log('Images', images);
    console.log('Body:', createProductDto);
    return this.productService.create(createProductDto, images);
  }

  @Get()
  findAll(
    @Query('category') category: string,
    @Query('limit') limit: number = 12,
    @Query('page') page: number = 1,
  ) {
    return this.productService.findAll(category, +limit, +page);
  }
  @Get('limitedProducts')
  findLimit(@Query('limitProducts') limitProducts: string) {
    return this.productService.findLimit(+limitProducts);
  }
  @Get('/search')
  search(@Query('query') query: string) {
    return this.productService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
