import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCustomerOrderHeaderDto {
  @IsString()
  @ApiProperty({
    example: 'b8cff7ec-cbf6-4788-84ea-71fe9c672dfb',
    type: String,
    description: 'input Order ID',
    required: true,
  })
  order_id: string;

  @IsString()
  @ApiProperty({
    example: 'dbf00469-0599-4db5-9a62-9d203c671d61',
    type: String,
    description: 'input User ID',
    required: true,
  })
  user_id: string;

  @IsNumber()
  @ApiProperty({
    example: 0,
    type: Number,
    description: 'extra passenger (example nany)',
    required: true,
  })
  extra_passenger: number;
}
