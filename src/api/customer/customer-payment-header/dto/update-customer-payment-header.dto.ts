import { PartialType } from '@nestjs/swagger';
import { CreateCustomerPaymentHeaderDto } from './create-customer-payment-header.dto';

export class UpdateCustomerPaymentHeaderDto extends PartialType(CreateCustomerPaymentHeaderDto) {}
