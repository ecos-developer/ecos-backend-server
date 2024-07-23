import { Module } from '@nestjs/common';
import { RealtimeLocationService } from './realtime-location.service';
import { RealtimeLocationController } from './realtime-location.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [RealtimeLocationController],
  providers: [RealtimeLocationService, JwtStrategy],
})
export class RealtimeLocationModule {}
