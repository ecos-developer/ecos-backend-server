import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'get order_id from RoomChat',
  })
  order_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'the user ID that send the messages',
  })
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'dummy messages',
  })
  message: string;
}
