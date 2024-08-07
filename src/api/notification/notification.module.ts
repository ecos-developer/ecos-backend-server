import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { SseConfigService } from 'src/config/sse.config.service';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [NotificationController],
  providers: [NotificationService, JwtStrategy, SseConfigService],
})
export class NotificationModule {}
