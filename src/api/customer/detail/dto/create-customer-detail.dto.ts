import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDetailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '2502136561',
    description: 'Binusian ID of customer',
    required: true,
  })
  binusian_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '08080808',
    description: 'Customer parent phone number',
    required: true,
  })
  parent_phone: string;
}
