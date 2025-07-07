import { Type } from 'class-transformer';
import {
  IsUUID,
  IsEmail,
  ValidateNested,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
export class AddressDto {
  @IsString()
  addressLine1: string;

  @IsString()
  city: string;

  @IsString()
  zip: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  state?: string;
}
export class CreateOrderDto {
  @IsUUID()
  userId: string;
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: {
    addressLine1: string;
    city: string;
    zip: string;
    country: string;
    state: string | undefined;
  };
  @IsString()
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsBoolean()
  isSubscribingToNewsletter?: boolean;
}
