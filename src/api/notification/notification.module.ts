import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { SseConfigService } from 'src/config/sse.config.service';
import { UserNotificationDeviceService } from '../user/user_notification_device/user_notification_device.service';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    UserNotificationDeviceService,
    JwtStrategy,
    SseConfigService,
  ],
})
export class NotificationModule {}
