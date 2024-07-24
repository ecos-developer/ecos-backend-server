import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class UserDetailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: false,
  })
  name?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
    required: false,
  })
  phone?: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({
    example: 'CUSTOMER',
    description: 'The role of the user',
    required: false,
    enum: Role,
  })
  role?: Role;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'INSERT AT THE IMAGE SERVER FIRST!',
    description: 'profile picture name',
    required: false,
  })
  profile_image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Main Street',
    description: 'The street of the user',
    required: false,
  })
  street?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 5,
    description: 'The grade of the user',
    required: false,
  })
  grade?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Is admin approved',
    required: false,
  })
  is_admin_approved?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Is email verified',
    required: false,
  })
  is_email_verified?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Is phone verified',
    required: false,
  })
  is_phone_verified?: boolean;
}
