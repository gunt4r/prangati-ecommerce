import {
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

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
  @Type(() => Number)
  price: number;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @Transform(({ value }) => {
    if (!value) return [];
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value;
  })
  images?: ProductImageDto[];

  @IsArray()
  @Type(() => ProductColorDto)
  colors: ProductColorDto[];

  @IsArray()
  @Type(() => ProductSizeDto)
  sizes: ProductSizeDto[];

  @IsNumber()
  @Type(() => Number)
  stock: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return value;
  })
  isFeatured?: boolean;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  rating?: number;
}
