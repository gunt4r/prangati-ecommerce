import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { userRoles } from 'src/utils/enums';

export class CreateAuthDto {
  @IsUUID()
  id: string;
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(userRoles)
  user_role?: userRoles;
}
