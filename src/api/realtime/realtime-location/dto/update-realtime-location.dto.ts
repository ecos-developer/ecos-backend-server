import { PartialType } from '@nestjs/swagger';
import { CreateRealtimeLocationDto } from './create-realtime-location.dto';

export class UpdateRealtimeLocationDto extends PartialType(
  CreateRealtimeLocationDto,
) {}
