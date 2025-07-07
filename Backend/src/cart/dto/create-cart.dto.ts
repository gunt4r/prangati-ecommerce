import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
class CartAttributeDto {
  @IsString()
  color: string;

  @IsString()
  size: string;
}
export class CreateCartDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  shouldIncrement?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartAttributeDto)
  attributes?: any;
}
