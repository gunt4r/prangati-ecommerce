import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateColorDto {
  @IsString({ message: 'Color name must be a string' })
  @IsNotEmpty({ message: 'Color name is required' })
  name: string;

  @IsString({ message: 'Color code must be a string' })
  @IsNotEmpty({ message: 'Color code is required' })
  @Matches(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})/, {
    message: 'Invalid color code format',
  })
  hexCode: string;
}
