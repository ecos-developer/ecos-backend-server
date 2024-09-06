import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerOrderHeaderDto } from './create-customer-order-header.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCustomerOrderHeaderDto extends PartialType(
  CreateCustomerOrderHeaderDto,
) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'update the ongoing status for customer order header',
    type: Boolean,
    example: true,
  })
  is_ongoing: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'update the cancel_pulang field',
    type: Boolean,
    example: true,
  })
  cancel_pulang: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'update the cancel_pergi field',
    type: Boolean,
    example: true,
  })
  cancel_pergi: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'update the driver approved status for customer order header',
    type: Boolean,
    example: true,
  })
  is_driver_approved: boolean;
}
