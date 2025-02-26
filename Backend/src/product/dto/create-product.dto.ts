import {
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductImageDto {
  @IsString()
  url: string;
}

class ProductColorDto {
  @IsString()
  color: string;
}

class ProductSizeDto {
  @IsString()
  size: string;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  categoryId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images: ProductImageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductColorDto)
  colors: ProductColorDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSizeDto)
  sizes: ProductSizeDto[];

  @IsNumber()
  stock: number;

  @IsString()
  category: string;

  @IsBoolean()
  @IsOptional()
  isFeatured: boolean;

  @IsNumber()
  @IsOptional()
  rating: number;
}
