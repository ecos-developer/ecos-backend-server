import {
  HttpException,
  HttpStatus,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { DriverVehicleDetailDto } from './dto/driver_vehicle_detail.dto';

@Injectable()
export class DriverVehicleDetailService {
  constructor(private prisma: PrismaService) {}

  async findOne(user: User) {
    const driverDetail = await this.prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
      include: {
        driver_detail: true,
        user_detail: true,
      },
    });
    return driverDetail;
  }

  async create(user: User, driverVehicleDetailDto: DriverVehicleDetailDto) {
    const createDriverVehicle = await this.prisma.driverDetail.create({
      data: {
        ...driverVehicleDetailDto,
        user: {
          connect: {
            user_id: user.user_id,
          },
        },
      },
    });
    return createDriverVehicle;
  }

  async update(
    user: User,
    vehicle_image_file: Express.Multer.File,
    driverVehicleDetailDto: DriverVehicleDetailDto,
  ) {
    const currDriver = await this.prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
      include: {
        driver_detail: true,
      },
    });

    if (user.role !== Role.DRIVER || currDriver.role !== Role.DRIVER) {
      throw new MethodNotAllowedException(
        `User ${user.email} is not a driver!`,
      );
    }

    if (!currDriver.driver_detail) {
      throw new MethodNotAllowedException(
        `User ${user.email} has not created driver details yet. You need to perform create driver detail!`,
      );
    }

    // Update only the provided fields, leaving other fields unchanged
    const updateDriverVehicle = await this.prisma.driverDetail.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        vehicle_image:
          driverVehicleDetailDto.vehicle_image ||
          currDriver.driver_detail.vehicle_image,
        vehicle_category:
          driverVehicleDetailDto.vehicle_category ||
          currDriver.driver_detail.vehicle_category,
        vehicle_model:
          driverVehicleDetailDto.vehicle_model ||
          currDriver.driver_detail.vehicle_model,
        vehicle_capacity:
          driverVehicleDetailDto.vehicle_capacity ||
          currDriver.driver_detail.vehicle_capacity,
        vehicle_number_plate:
          driverVehicleDetailDto.vehicle_number_plate ||
          currDriver.driver_detail.vehicle_number_plate,
      },
    });

    return new HttpException(updateDriverVehicle, HttpStatus.OK);
  }
}
