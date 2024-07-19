import { Injectable } from '@nestjs/common';
import { CreateCustomerOrderHeaderDto } from './dto/create-customer-order-header.dto';
import { UpdateCustomerOrderHeaderDto } from './dto/update-customer-order-header.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerOrderHeaderService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCustomerOrderHeaderDto: CreateCustomerOrderHeaderDto) {
    const newCustomerOrder = await this.prisma.customerOrderHeader.create({
      data: {
        ...createCustomerOrderHeaderDto,
      },
      include: {
        user: true,
        payment_header: true,
        driver_order_header: {
          include: {
            admin_time_block: true,
          },
        },
        realtime_customer_each_day_pickup: true,
      },
    });
    return newCustomerOrder;
  }

  async findAll() {
    const allCustomerOrderHeader =
      await this.prisma.customerOrderHeader.findMany({
        include: {
          user: true,
          payment_header: true,
          driver_order_header: {
            include: {
              admin_time_block: true,
            },
          },
          realtime_customer_each_day_pickup: true,
        },
      });
    return allCustomerOrderHeader;
  }

  async findOne(id: string) {
    const findCustomerOrderHeader =
      await this.prisma.customerOrderHeader.findFirst({
        where: {
          customer_order_id: id,
        },
        include: {
          user: true,
          payment_header: true,
          driver_order_header: {
            include: {
              admin_time_block: true,
            },
          },
          realtime_customer_each_day_pickup: true,
        },
      });
    return findCustomerOrderHeader;
  }

  async update(
    id: string,
    updateCustomerOrderHeaderDto: UpdateCustomerOrderHeaderDto,
  ) {
    const updateCustomerOrderHeader =
      await this.prisma.customerOrderHeader.update({
        where: {
          customer_order_id: id,
        },
        data: {
          ...updateCustomerOrderHeaderDto,
        },
        include: {
          user: true,
          payment_header: true,
          driver_order_header: {
            include: {
              admin_time_block: true,
            },
          },
          realtime_customer_each_day_pickup: true,
        },
      });

    return updateCustomerOrderHeader;
  }
}
