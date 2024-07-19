import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDriverOrderHeaderDto } from './create-driver-order-header.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateDriverOrderHeaderDto extends PartialType(
  CreateDriverOrderHeaderDto,
) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'update the admin approval',
    type: Boolean,
    example: true,
  })
  is_admin_approved: boolean;
}
