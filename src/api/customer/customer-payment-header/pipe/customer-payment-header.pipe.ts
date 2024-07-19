import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateCustomerPaymentHeaderDto } from '../dto/create-customer-payment-header.dto';

@Injectable()
export class CustomerPaymentHeaderPipe implements PipeTransform {
  transform(value: CreateCustomerPaymentHeaderDto) {
    const result = { ...value };

    if (result.payment_total !== undefined) {
      result.payment_total = this.toNumber(result.payment_total);
    }
    return result;
  }

  toNumber(value: any): number {
    const val = parseFloat(value);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed (number expected) for value: ${value}`,
      );
    }
    return val;
  }
}
