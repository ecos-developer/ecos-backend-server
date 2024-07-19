import { Module } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailController } from './detail.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [DetailController],
  providers: [DetailService, JwtStrategy],
})
export class DetailModule {}
