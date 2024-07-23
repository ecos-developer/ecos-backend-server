import { PartialType } from '@nestjs/swagger';
import { CreateRealtimeCustomerEachDayPickupDto } from './create-realtime-customer-each-day-pickup.dto';

export class UpdateRealtimeCustomerEachDayPickupDto extends PartialType(CreateRealtimeCustomerEachDayPickupDto) {}
