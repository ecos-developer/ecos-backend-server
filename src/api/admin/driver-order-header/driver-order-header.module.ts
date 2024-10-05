import { Module } from '@nestjs/common';
import { DriverOrderHeaderService } from './driver-order-header.service';
import { DriverOrderHeaderController } from './driver-order-header.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { SseConfigService } from 'src/config/sse.config.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { NotificationService } from 'src/api/notification/notification.service';
import { UserNotificationDeviceService } from 'src/api/user/user_notification_device/user_notification_device.service';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [DriverOrderHeaderController],
  providers: [
    DriverOrderHeaderService,
    JwtStrategy,
    FirebaseService,
    SseConfigService,
    NotificationService,
    UserNotificationDeviceService,
  ],
})
export class DriverOrderHeaderModule {}
