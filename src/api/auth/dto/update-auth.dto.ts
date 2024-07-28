import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuthDto {
  @ApiProperty({
    example: 'get this from User table',
    description: 'The ID of the user',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    example: 'admin123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
