import { Module } from '@nestjs/common';
import { CustomerPaymentHeaderService } from './customer-payment-header.service';
import { CustomerPaymentHeaderController } from './customer-payment-header.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [CustomerPaymentHeaderController],
  providers: [
    CustomerPaymentHeaderService,
    JwtStrategy,
    FirebaseService,
    SseConfigService,
  ],
})
export class CustomerPaymentHeaderModule {}
