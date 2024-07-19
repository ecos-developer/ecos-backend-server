import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'admin123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
