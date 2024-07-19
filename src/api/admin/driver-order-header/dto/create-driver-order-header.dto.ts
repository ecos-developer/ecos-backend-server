import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDriverOrderHeaderDto {
  @IsString()
  @ApiProperty({
    description: 'registered driver ID',
    type: String,
    example: 'you can get this ID from user that has role DRIVER, table User',
  })
  driver_id: string;

  @IsString()
  @ApiProperty({
    description: 'admin time block ID',
    type: String,
    example: 'get this ID from AdminTimeBlock table',
  })
  time_block_id: string;
}
