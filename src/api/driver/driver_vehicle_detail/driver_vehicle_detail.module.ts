import { Module } from '@nestjs/common';
import { DriverVehicleDetailService } from './driver_vehicle_detail.service';
import { DriverVehicleDetailController } from './driver_vehicle_detail.controller';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { EnvService } from 'src/api/env/env.service';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [DriverVehicleDetailController],
  providers: [DriverVehicleDetailService, EnvService, JwtStrategy],
})
export class DriverVehicleDetailModule {}
