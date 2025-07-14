import {
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsUUID,
  ArrayMinSize,
  Min,
  Max,
  IsUrl,
  IsEnum,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { genderEnum } from 'src/utils/enums';

class ProductImageDto {
  @IsString()
  @IsUrl()
  url: string;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsUUID()
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
  @ArrayMinSize(1)
  @IsUUID(4, { each: true })
  colors: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID(4, { each: true })
  sizes: string[];

  @IsNumber()
  @Min(0)
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

  @IsOptional()
  @IsEnum(genderEnum)
  gender?: genderEnum;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;
}
