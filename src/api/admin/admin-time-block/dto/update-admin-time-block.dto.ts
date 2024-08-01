import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { InsertAdminTimeBlockDto } from './insert-admin-time-block.dto';

export class UpdateAdminTimeBlockDto extends PartialType(
  InsertAdminTimeBlockDto,
) {}
