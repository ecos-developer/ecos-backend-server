import { Module } from '@nestjs/common';
import { RealtimeCustomerEachDayPickupService } from './realtime-customer-each-day-pickup.service';
import { RealtimeCustomerEachDayPickupController } from './realtime-customer-each-day-pickup.controller';

@Module({
  controllers: [RealtimeCustomerEachDayPickupController],
  providers: [RealtimeCustomerEachDayPickupService],
})
export class RealtimeCustomerEachDayPickupModule {}
