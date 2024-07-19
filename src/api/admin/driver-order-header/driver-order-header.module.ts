import { Module } from '@nestjs/common';
import { DriverOrderHeaderService } from './driver-order-header.service';
import { DriverOrderHeaderController } from './driver-order-header.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [DriverOrderHeaderController],
  providers: [DriverOrderHeaderService, JwtStrategy],
})
export class DriverOrderHeaderModule {}
