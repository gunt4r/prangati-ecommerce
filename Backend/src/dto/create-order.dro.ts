import { IsString, IsUUID, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  totalAmount: number;

  @IsString()
  status: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  address: string;

  @IsString()
  country: string;
}
