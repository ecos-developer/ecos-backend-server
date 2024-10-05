import { Module } from '@nestjs/common';
import { CustomerPaymentHeaderService } from './customer-payment-header.service';
import { CustomerPaymentHeaderController } from './customer-payment-header.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { NotificationService } from 'src/api/notification/notification.service';
import { UserNotificationDeviceService } from 'src/api/user/user_notification_device/user_notification_device.service';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [CustomerPaymentHeaderController],
  providers: [
    CustomerPaymentHeaderService,
    JwtStrategy,
    FirebaseService,
    SseConfigService,
    NotificationService,
    UserNotificationDeviceService,
  ],
})
export class CustomerPaymentHeaderModule {}
