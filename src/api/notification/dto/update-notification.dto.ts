import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'set is the current notification is already being read or no',
  })
  is_read: boolean;
}
