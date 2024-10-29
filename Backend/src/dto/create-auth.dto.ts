import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
