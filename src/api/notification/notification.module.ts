import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports:[PrismaModule, PassportModule],
  controllers: [NotificationController],
  providers: [NotificationService, JwtStrategy],
})
export class NotificationModule {}
