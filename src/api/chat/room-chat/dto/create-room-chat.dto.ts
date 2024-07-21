import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomChatDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'from DriverOrderHeader table',
  })
  order_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Room Chat Driver 1',
  })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: false,
  })
  is_expired: boolean;
}
