import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomerPaymentHeaderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'get the ID from CustomerOrderHeader table',
    example: 'test',
  })
  customer_order_id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'payment proof image',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  payment_proof_image_file: string;

  payment_proof_image: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Payment total',
    example: 6000000,
  })
  @Transform(({ value }) => (value === '' ? null : parseInt(value, 10)))
  payment_total: number;
}
