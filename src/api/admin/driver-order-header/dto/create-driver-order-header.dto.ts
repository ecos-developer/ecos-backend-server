import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDriverOrderHeaderDto {
  @IsString()
  @ApiProperty({
    description: 'registered driver ID',
    type: String,
    example: '98a80dd4-38bc-4ce6-9e70-6c2516fac9b2',
  })
  driver_id: string;

  @IsString()
  @ApiProperty({
    description: 'admin time block ID',
    type: String,
    example: '448c1e31-03d6-4b82-b6a8-4058103f7cda',
  })
  time_block_id: string;
}
