import { Module } from '@nestjs/common';
import { AdminTimeBlockService } from './admin-time-block.service';
import { AdminTimeBlockController } from './admin-time-block.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [AdminTimeBlockController],
  providers: [
    AdminTimeBlockService,
    JwtStrategy,
    FirebaseService,
    SseConfigService,
  ],
})
export class AdminTimeBlockModule {}
