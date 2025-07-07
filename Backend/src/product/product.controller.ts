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
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AdvancedSearchDto } from './dto/product-queries.dto';
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
    console.log('imagess', images);
    console.log('createProductDto', createProductDto);
    return this.productService.create(createProductDto, images);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.productService.findAll(query);
  }
  @Get('advanced-search')
  async advancedSearch(
    @Paginate() query: PaginateQuery,
    @Query() allQueryParams: AdvancedSearchDto,
  ) {
    console.log('sortBy raw', query);
    const parseArrayParam = (
      param: string | string[] | undefined,
    ): string[] | undefined => {
      if (!param) return undefined;
      const arr = Array.isArray(param) ? param : [param];
      return arr.map((v) => decodeURIComponent(v));
    };

    const filters = {
      minPrice: allQueryParams.minPrice
        ? Number(allQueryParams.minPrice)
        : undefined,
      maxPrice: allQueryParams.maxPrice
        ? Number(allQueryParams.maxPrice)
        : undefined,
      colorIds: parseArrayParam(allQueryParams.colorIds),
      sizeIds: parseArrayParam(allQueryParams.sizeIds),
      categoryIds: parseArrayParam(allQueryParams.categoryIds),
      inStock: allQueryParams.inStock === true,
      featured: allQueryParams.featured === true,
      minRating: allQueryParams.minRating
        ? Number(allQueryParams.minRating)
        : undefined,
      sortBy: allQueryParams.sortBy
        ? decodeURIComponent(allQueryParams.sortBy)
        : undefined,
      gender: allQueryParams.gender,
    };

    console.log('object', filters);
    return this.productService.findWithAdvancedFilters(query, filters);
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.productService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
