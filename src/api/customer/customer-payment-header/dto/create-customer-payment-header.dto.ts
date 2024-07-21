import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerPaymentHeaderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'get the ID from CustomerOrderHeader table',
    example: 'Get from CustomerOrderHeader table!',
  })
  customer_order_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'INSERT IMAGE AT IMAGE SERVER FIRST!',
    description: 'payment proof image',
  })
  payment_proof_image: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Payment total',
    example: 6000000,
  })
  payment_total: number;
}
