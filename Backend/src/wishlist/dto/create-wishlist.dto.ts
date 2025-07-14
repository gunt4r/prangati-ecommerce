import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
  @IsUUID()
  @IsNotEmpty()
  userID: string;

  @IsUUID()
  @IsNotEmpty()
  productID: string;
}
