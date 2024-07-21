import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { DriverVehicleDetailDto } from './dto/driver_vehicle_detail.dto';
import { UpdateDriverVehicleDetailDto } from './dto/update-driver-vehicle-detail.dto';

@Injectable()
export class DriverVehicleDetailService {
  constructor(private prisma: PrismaService) {}

  async findOne(user: User) {
    const driverDetail = await this.prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
      include: {
        driver_detail: {
          include: {
            payment: true,
          },
        },
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
    updateDriverVehicleDetailDto: UpdateDriverVehicleDetailDto,
  ) {
    // Update only the provided fields, leaving other fields unchanged
    const updateDriverVehicle = await this.prisma.driverDetail.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        ...updateDriverVehicleDetailDto,
      },
    });

    return updateDriverVehicle;
  }
}
