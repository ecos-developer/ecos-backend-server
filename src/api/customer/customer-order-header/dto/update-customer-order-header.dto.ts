import { PartialType } from '@nestjs/swagger';
import { CreateCustomerOrderHeaderDto } from './create-customer-order-header.dto';

export class UpdateCustomerOrderHeaderDto extends PartialType(CreateCustomerOrderHeaderDto) {}
