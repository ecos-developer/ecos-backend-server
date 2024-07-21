import { Module } from '@nestjs/common';
import { CustomerPaymentHeaderService } from './customer-payment-header.service';
import { CustomerPaymentHeaderController } from './customer-payment-header.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [CustomerPaymentHeaderController],
  providers: [CustomerPaymentHeaderService, JwtStrategy],
})
export class CustomerPaymentHeaderModule {}
