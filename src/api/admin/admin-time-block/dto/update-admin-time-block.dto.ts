import { PartialType } from '@nestjs/swagger';
import { InsertAdminTimeBlockDto } from './insert-admin-time-block.dto';

export class UpdateAdminTimeBlockDto extends PartialType(
  InsertAdminTimeBlockDto,
) {}
