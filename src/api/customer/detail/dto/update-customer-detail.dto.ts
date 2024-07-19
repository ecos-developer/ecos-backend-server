import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDetailDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '2502136561',
    description: 'Binusian ID of customer',
    required: false,
  })
  binusian_id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '08080808',
    description: 'Customer parent phone number',
    required: false,
  })
  parent_phone?: string;
}
