import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'BCA',
    description: 'The name of payment service',
    required: false,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '8600126651',
    description: 'The account number of payment service',
    required: false,
  })
  account_number: string;
}
