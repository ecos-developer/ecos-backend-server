import { Module } from '@nestjs/common';
import { CustomerOrderHeaderService } from './customer-order-header.service';
import { CustomerOrderHeaderController } from './customer-order-header.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { DriverOrderHeaderService } from 'src/api/admin/driver-order-header/driver-order-header.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { NotificationService } from 'src/api/notification/notification.service';
import { UserNotificationDeviceService } from 'src/api/user/user_notification_device/user_notification_device.service';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [CustomerOrderHeaderController],
  providers: [
    CustomerOrderHeaderService,
    DriverOrderHeaderService,
    JwtStrategy,
    FirebaseService,
    SseConfigService,
    NotificationService,
    UserNotificationDeviceService,
  ],
})
export class CustomerOrderHeaderModule {}
