import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerPaymentHeaderDto } from './create-customer-payment-header.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCustomerPaymentHeaderDto extends PartialType(
  CreateCustomerPaymentHeaderDto,
) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'for admin approve or disapprove the customer payment header',
    example: true,
    type: Boolean,
  })
  is_admin_approved: boolean;
}
