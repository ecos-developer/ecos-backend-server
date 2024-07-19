import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DriverVehicleDetailDto } from '../dto/driver_vehicle_detail.dto';

@Injectable()
export class ParseDriverDetailPipe implements PipeTransform {
  transform(value: DriverVehicleDetailDto) {
    const result = { ...value };

    if (result.vehicle_capacity !== undefined) {
      result.vehicle_capacity = this.toNumber(result.vehicle_capacity);
    }

    return result;
  }

  toNumber(value: any): number {
    const val = parseFloat(value);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed (number expected) for value: ${value}`,
      );
    }
    return val;
  }
}
