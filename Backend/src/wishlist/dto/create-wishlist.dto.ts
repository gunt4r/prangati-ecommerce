import { IsString } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  userID: string;

  @IsString()
  productID: string;
}
