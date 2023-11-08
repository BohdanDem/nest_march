import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserBaseRequestDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  userName: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  city: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  avatar?: string;
}

export class UserLoginDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserLoginGoogleDto {
  // @Transform(({ value }) => value.trim().toLowerCase())
  // @IsString()
  // @IsEmail()
  // @IsNotEmpty()
  // email: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
