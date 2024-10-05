import { Module } from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { UserDetailController } from './user_detail.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { NotificationService } from 'src/api/notification/notification.service';
import { UserNotificationDeviceService } from '../user_notification_device/user_notification_device.service';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [UserDetailController],
  providers: [
    UserDetailService,
    JwtStrategy,
    FirebaseService,
    SseConfigService,
    NotificationService,
    UserNotificationDeviceService,
  ],
})
export class UserDetailModule {}
