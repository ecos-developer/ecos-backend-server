import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @ApiProperty({ example: '8052', description: 'phone number' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'John Doe', description: 'first name + last name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Jl Syahdan', description: 'guest address' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: 5, description: 'guest current grade' })
  @IsNotEmpty()
  @IsNumber()
  grade: number;
}
