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
import axios from 'axios';
import { EnvService } from 'src/api/env/env.service';

@Injectable()
export class DriverVehicleDetailService {
  constructor(
    private prisma: PrismaService,
    private readonly env: EnvService,
  ) {}

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
    vehicle_image_file: Express.Multer.File,
    driverVehicleDetailDto: DriverVehicleDetailDto,
  ) {
    if (vehicle_image_file.size === undefined) {
      throw new BadRequestException(
        'No files uploaded! expected [vehicle_image_file]',
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

    driverVehicleDetailDto.vehicle_image =
      await this.imageUpload(vehicle_image_file);
    const createDriverVehicle = await this.prisma.driverDetail.create({
      data: {
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

  async imageUpload(file: Express.Multer.File) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('vehicle_image_file', Buffer.from(file.buffer), {
      filename: file.originalname,
    });

    const imageUpload = await axios.post(
      `${this.env.getConfigValues().IMAGE_SERVER_ENDPOINT}/upload-image/driver-detail`,
      formData,
      {
        headers: formData.getHeaders(),
      },
    );
    return imageUpload.data;
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

    if (vehicle_image_file.size !== undefined) {
      driverVehicleDetailDto.vehicle_image =
        await this.imageUpload(vehicle_image_file);
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
