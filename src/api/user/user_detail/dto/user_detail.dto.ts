import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class UserDetailDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  phone?: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({
    example: 'CUSTOMER',
    description: 'The role of the user',
    required: false,
    enum: Role,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  role?: Role;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'User profile image input',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  profile_image_file?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? null : value))
  profile_image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Main Street',
    description: 'The street of the user',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  street?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === '' ? null : parseInt(value, 10)))
  @ApiProperty({
    example: 5,
    description: 'The grade of the user',
    required: false,
  })
  grade?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    value === '' ? null : value === 'true' || value === true,
  )
  @ApiProperty({
    example: true,
    description: 'Is admin approved',
    required: false,
  })
  is_admin_approved?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    value === '' ? null : value === 'true' || value === true,
  )
  @ApiProperty({
    example: true,
    description: 'Is email verified',
    required: false,
  })
  is_email_verified?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    value === '' ? null : value === 'true' || value === true,
  )
  @ApiProperty({
    example: true,
    description: 'Is phone verified',
    required: false,
  })
  is_phone_verified?: boolean;
}
