import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserNotificationDeviceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'get this from client devices',
  })
  push_token: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'get this from users table',
  })
  user_id: string;
}
