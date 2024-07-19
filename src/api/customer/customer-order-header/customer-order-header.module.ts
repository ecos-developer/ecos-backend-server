import { Module } from '@nestjs/common';
import { CustomerOrderHeaderService } from './customer-order-header.service';
import { CustomerOrderHeaderController } from './customer-order-header.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { DriverOrderHeaderService } from 'src/api/admin/driver-order-header/driver-order-header.service';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [CustomerOrderHeaderController],
  providers: [
    CustomerOrderHeaderService,
    DriverOrderHeaderService,
    JwtStrategy,
  ],
})
export class CustomerOrderHeaderModule {}
