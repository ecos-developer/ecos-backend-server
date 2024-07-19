import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'BCA',
    description: 'The name of payment service',
    required: false,
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '8600126651',
    description: 'The account number of payment service',
    required: false,
  })
  account_number: string;
}
