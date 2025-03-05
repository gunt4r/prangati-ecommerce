import { IsIn, IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  name: string;
  @IsIn(['tall', 'wide', 'normal'])
  cardType: 'tall' | 'wide' | 'normal';
}
