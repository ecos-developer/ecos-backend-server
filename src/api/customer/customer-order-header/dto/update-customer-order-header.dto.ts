import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerOrderHeaderDto } from './create-customer-order-header.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCustomerOrderHeaderDto extends PartialType(CreateCustomerOrderHeaderDto) {

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
      description: 'update the ongoing status for customer order header',
      type: Boolean,
      example: true,
    })
    is_ongoing: boolean;

}
