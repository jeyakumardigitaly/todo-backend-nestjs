import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enum/role.enum';

export class RegisterDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}