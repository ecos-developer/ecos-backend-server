import { Module } from '@nestjs/common';
import { AdminTimeBlockService } from './admin-time-block.service';
import { AdminTimeBlockController } from './admin-time-block.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [AdminTimeBlockController],
  providers: [AdminTimeBlockService, JwtStrategy],
})
export class AdminTimeBlockModule {}
