import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { DriverVehicleDetailDto } from './dto/driver_vehicle_detail.dto';

@Injectable()
export class DriverVehicleDetailService {
  constructor(private prisma: PrismaService) {}

  async findOne(user: User) {
    if (user.role !== Role.DRIVER) {
      throw new MethodNotAllowedException(`user ${user.email} is not driver!`);
    }
    const driverDetail = await this.prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
      include: {
        driver_detail: true,
        user_detail: true,
      },
    });

    if (!driverDetail) {
      throw new NotFoundException(
        `driver detail with email ${user.email} is not found!`,
      );
    }

    return new HttpException(driverDetail, HttpStatus.CREATED);
  }

  async create(
    user: User,
    files: Array<Express.Multer.File>,
    driverVehicleDetailDto: DriverVehicleDetailDto,
  ) {
    if (!files) {
      throw new BadRequestException(
        'No files uploaded [vehicle_image, sim, stnk, kk, and ktp]',
      );
    }
    const fileArray = Object.keys(files).map((key) => files[key]);
    if (fileArray.length !== 5) {
      throw new BadRequestException(
        'all of this file field is required!` [vehicle_image, sim, stnk, kk, and ktp]',
      );
    }
    const currDriver = await this.prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
      include: {
        driver_detail: true,
      },
    });
    if (user.role !== Role.DRIVER || currDriver.role !== Role.DRIVER) {
      throw new MethodNotAllowedException(`user ${user.email} is not driver!`);
    }

    if (currDriver.driver_detail) {
      throw new MethodNotAllowedException(
        `user ${user.email} is already create driver detail, you need to perform update driver detail!`,
      );
    }

    const vehicle_image_file = fileArray.find(
      (file) => file.fieldname === 'vehicle_image_file',
    );
    const ktp_file = fileArray.find((file) => file.fieldname === 'ktp_file');
    const sim_file = fileArray.find((file) => file.fieldname === 'sim_file');
    const stnk_file = fileArray.find((file) => file.fieldname === 'stnk_file');
    const kk_file = fileArray.find((file) => file.fieldname === 'kk_file');

    driverVehicleDetailDto.vehicle_image = vehicle_image_file.filename;
    driverVehicleDetailDto.kk = kk_file.filename;
    driverVehicleDetailDto.sim = sim_file.filename;
    driverVehicleDetailDto.stnk = stnk_file.filename;
    driverVehicleDetailDto.ktp = ktp_file.filename;
    const createDriverVehicle = await this.prisma.driverDetail.create({
      data: {
        kk: driverVehicleDetailDto.kk,
        sim: driverVehicleDetailDto.sim,
        stnk: driverVehicleDetailDto.stnk,
        ktp: driverVehicleDetailDto.ktp,
        vehicle_image: driverVehicleDetailDto.vehicle_image,
        vehicle_category: driverVehicleDetailDto.vehicle_category,
        vehicle_model: driverVehicleDetailDto.vehicle_model,
        vehicle_capacity: driverVehicleDetailDto.vehicle_capacity,
        vehicle_number_plate: driverVehicleDetailDto.vehicle_number_plate,
        // user_id: user.user_id,
        user: {
          connect: {
            user_id: user.user_id,
          },
        },
      },
    });

    return new HttpException(createDriverVehicle, HttpStatus.CREATED);
  }

  async update(
    user: User,
    files: Array<Express.Multer.File>,
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

    const updatedData: any = {};
    const fileArray = Object.keys(files).map((key) => files[key]);

    if (fileArray) {
      fileArray.forEach((file) => {
        switch (file.fieldname) {
          case 'vehicle_image_file':
            updatedData.vehicle_image = file.filename;
            break;
          case 'ktp_file':
            updatedData.ktp = file.filename;
            break;
          case 'sim_file':
            updatedData.sim = file.filename;
            break;
          case 'stnk_file':
            updatedData.stnk = file.filename;
            break;
          case 'kk_file':
            updatedData.kk = file.filename;
            break;
        }
      });
    }

    // Update only the provided fields, leaving other fields unchanged
    const updateDriverVehicle = await this.prisma.driverDetail.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        ...updatedData,
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
