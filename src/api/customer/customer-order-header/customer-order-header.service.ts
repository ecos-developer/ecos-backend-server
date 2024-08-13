import { Injectable } from '@nestjs/common';
import { CreateCustomerOrderHeaderDto } from './dto/create-customer-order-header.dto';
import { UpdateCustomerOrderHeaderDto } from './dto/update-customer-order-header.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class CustomerOrderHeaderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sse: SseConfigService,
    private readonly firebase: FirebaseService,
  ) {}
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
    await this.firebase.customerOrderHeaderForAdminRealtime(
      this.sse.CUSTOMERORDERHEADER_OBSERVABLE_STRING,
    );
    await this.firebase.customerOrderHeaderEachRealtime(
      this.sse.CUSTOMERORDERHEADER_OBSERVABLE_STRING,
      newCustomerOrder.customer_order_id,
    );
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

  async findByUserId(user_id: string) {
    const findCustomerOrderHeader = await this.prisma.user.findFirst({
      where: {
        user_id,
      },
      include: {
        user_detail: true,
        customer_order_header: {
          include: {
            payment_header: true,
            driver_order_header: {
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
              },
            },
          },
        },
      },
    });
    return findCustomerOrderHeader;
  }

  async findByPairs(user_id: string, order_id: string) {
    const findCustomerOrderHeader =
      await this.prisma.customerOrderHeader.findFirst({
        where: {
          order_id: order_id,
          user_id: user_id,
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

    await this.firebase.customerOrderHeaderEachRealtime(
      this.sse.CUSTOMERORDERHEADER_OBSERVABLE_STRING,
      id,
    );
    return updateCustomerOrderHeader;
  }
}
