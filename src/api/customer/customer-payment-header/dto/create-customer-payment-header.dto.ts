import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
