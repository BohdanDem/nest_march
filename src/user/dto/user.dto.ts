import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateProfileDto {
  @IsString()
  userName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}

export class UserCreateResponse {
  userName: string;
  email: string;
  city: string;
  age: number;
  status: boolean;
  createdAt: Date;
  id: string;
}
