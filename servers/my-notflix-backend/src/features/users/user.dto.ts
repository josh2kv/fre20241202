import { UserRole } from "@/types";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsString()
  tmdbApiKey: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  username?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  tmdbApiKey?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export type BriefUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  tmdbApiKey: string;
};
