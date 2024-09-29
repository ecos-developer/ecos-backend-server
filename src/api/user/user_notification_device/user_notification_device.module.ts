import { Module } from '@nestjs/common';
import { UserNotificationDeviceService } from './user_notification_device.service';
import { UserNotificationDeviceController } from './user_notification_device.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [UserNotificationDeviceController],
  providers: [
    UserNotificationDeviceService,
    JwtStrategy,
    FirebaseService,
    SseConfigService,
  ],
})
export class UserNotificationDeviceModule {}
