import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSizeDto {
  @IsString({ message: 'Size must be a string' })
  @IsNotEmpty({ message: 'Size is required' })
  size: string;
}
