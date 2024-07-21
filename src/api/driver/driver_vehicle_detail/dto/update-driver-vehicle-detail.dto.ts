import { PartialType } from '@nestjs/swagger';
import { DriverVehicleDetailDto } from './driver_vehicle_detail.dto';

export class UpdateDriverVehicleDetailDto extends PartialType(
  DriverVehicleDetailDto,
) {}
