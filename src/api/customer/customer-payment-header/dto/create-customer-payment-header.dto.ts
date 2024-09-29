import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomerPaymentHeaderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Get from CustomerOrderHeader table!',
  })
  customer_order_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'INSERT IMAGE AT IMAGE SERVER FIRST!',
  })
  payment_proof_image: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 6000000,
  })
  payment_total: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 0,
    type: Number,
    description: 'extra passenger (example nany)',
  })
  distance_from_school: number;
}
