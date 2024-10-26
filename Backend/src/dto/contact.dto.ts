import { IsNotEmpty } from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  body: string;
}
