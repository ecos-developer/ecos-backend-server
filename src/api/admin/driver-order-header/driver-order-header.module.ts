import { Module } from '@nestjs/common';
import { DriverOrderHeaderService } from './driver-order-header.service';
import { DriverOrderHeaderController } from './driver-order-header.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { SseConfigService } from 'src/config/sse.config.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [DriverOrderHeaderController],
  providers: [
    DriverOrderHeaderService,
    JwtStrategy,
    FirebaseService,
    SseConfigService,
  ],
})
export class DriverOrderHeaderModule {}
