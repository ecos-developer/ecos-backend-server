import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'get this from User table',
  })
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:'this is example notification message'
  })
  content: string;
}
