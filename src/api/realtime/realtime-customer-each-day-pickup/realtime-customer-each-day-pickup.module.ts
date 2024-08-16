import { Module } from '@nestjs/common';
import { RealtimeCustomerEachDayPickupService } from './realtime-customer-each-day-pickup.service';
import { RealtimeCustomerEachDayPickupController } from './realtime-customer-each-day-pickup.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [RealtimeCustomerEachDayPickupController],
  providers: [
    RealtimeCustomerEachDayPickupService,
    JwtService,
    FirebaseService,
    SseConfigService,
  ],
})
export class RealtimeCustomerEachDayPickupModule {}
