import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [PaymentController],
  providers: [PaymentService, JwtStrategy],
})
export class PaymentModule {}
