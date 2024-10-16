import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCustomerOrderHeaderDto {
  @IsString()
  @ApiProperty({
    example: 'get this ID from DriverOrderHeader table',
    type: String,
    description: 'input Order ID',
  })
  order_id: string;

  @IsString()
  @ApiProperty({
    example: 'get this ID from table User that has role CUSTOMER',
    type: String,
    description: 'input User ID',
  })
  user_id: string;

  @IsNumber()
  @ApiProperty({
    example: 0,
    type: Number,
    description: 'extra passenger (example nany)',
  })
  extra_passenger: number;
}
