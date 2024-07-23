import { Module } from '@nestjs/common';
import { RealtimeCustomerEachDayPickupService } from './realtime-customer-each-day-pickup.service';
import { RealtimeCustomerEachDayPickupController } from './realtime-customer-each-day-pickup.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [RealtimeCustomerEachDayPickupController],
  providers: [RealtimeCustomerEachDayPickupService, JwtService],
})
export class RealtimeCustomerEachDayPickupModule {}
