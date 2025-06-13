import { IsUUID, IsEmail, IsPhoneNumber } from 'class-validator';
export class CreateOrderDto {
  @IsUUID()
  userId: string;
  address: {
    addressLine1: string;
    city: string;
    zip: string;
    country: string;
    state: string | undefined;
  };
  @IsPhoneNumber()
  phone: string;
  @IsEmail()
  email: string;
  firstName: string;
  lastName: string;
  isSubscribingToNewsletter?: boolean;
}
