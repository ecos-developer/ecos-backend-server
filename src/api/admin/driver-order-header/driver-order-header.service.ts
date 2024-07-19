import { Injectable } from '@nestjs/common';
import { CreateDriverOrderHeaderDto } from './dto/create-driver-order-header.dto';
import { UpdateDriverOrderHeaderDto } from './dto/update-driver-order-header.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DriverOrderHeaderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDriverOrderHeaderDto: CreateDriverOrderHeaderDto) {
    const newDriverOrderHeader = await this.prisma.driverOrderHeader.create({
      data: {
        driver_id: createDriverOrderHeaderDto.driver_id,
        time_block_id: createDriverOrderHeaderDto.time_block_id,
        is_admin_approved: false,
      },
    });

    return newDriverOrderHeader;
  }

  async findAll() {
    const allDriverOrderHeader = await this.prisma.driverOrderHeader.findMany({
      include: {
        user: {
          include: {
            user_detail: true,
            driver_detail: {
              include: {
                payment: true,
              },
            },
          },
        },
        admin_time_block: true,
      },
    });

    return allDriverOrderHeader;
  }

  async findOne(id: string) {
    const driverOrderById = await this.prisma.driverOrderHeader.findFirst({
      where: {
        order_id: id,
      },
      include: {
        user: true,
        admin_time_block: true,
        customer_order_header: {
          include: {
            user: {
              include: {
                customer_detail: true,
                user_detail: true,
              },
            },
          },
        },
      },
    });

    return driverOrderById;
  }

  async update(
    id: string,
    updateDriverOrderHeaderDto: UpdateDriverOrderHeaderDto,
  ) {
    const updateDriverOrderById = await this.prisma.driverOrderHeader.update({
      where: {
        order_id: id,
      },
      data: {
        ...updateDriverOrderHeaderDto,
      },
    });

    return updateDriverOrderById;
  }
}
