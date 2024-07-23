import { Injectable } from '@nestjs/common';
import { CreateRealtimeCustomerEachDayPickupDto } from './dto/create-realtime-customer-each-day-pickup.dto';
import { UpdateRealtimeCustomerEachDayPickupDto } from './dto/update-realtime-customer-each-day-pickup.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RealtimeCustomerEachDayPickupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createRealtimeCustomerEachDayPickupDto: CreateRealtimeCustomerEachDayPickupDto,
  ) {
    const newPickup = await this.prisma.realtimeCustomerEachDayPickup.create({
      data: {
        ...createRealtimeCustomerEachDayPickupDto,
      },
      include: {
        customer_order_header: {
          include: {
            user: {
              include: {
                user_detail: true,
                customer_detail: true,
              },
            },
            driver_order_header: {
              include: {
                user: {
                  include: {
                    user_detail: true,
                    driver_detail: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return newPickup;
  }

  async findAll() {
    const allPickup = await this.prisma.realtimeCustomerEachDayPickup.findMany({
      include: {
        customer_order_header: {
          include: {
            user: {
              include: {
                user_detail: true,
                customer_detail: true,
              },
            },
            driver_order_header: {
              include: {
                user: {
                  include: {
                    user_detail: true,
                    driver_detail: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return allPickup;
  }

  async findOne(pickup_id: string) {
    const findPickup =
      await this.prisma.realtimeCustomerEachDayPickup.findFirst({
        where: {
          pickup_id,
        },
        include: {
          customer_order_header: {
            include: {
              user: {
                include: {
                  user_detail: true,
                  customer_detail: true,
                },
              },
              driver_order_header: {
                include: {
                  user: {
                    include: {
                      user_detail: true,
                      driver_detail: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    return findPickup;
  }

  async update(
    pickup_id: string,
    updateRealtimeCustomerEachDayPickupDto: UpdateRealtimeCustomerEachDayPickupDto,
  ) {
    const updatePickup = await this.prisma.realtimeCustomerEachDayPickup.update(
      {
        where: {
          pickup_id,
        },
        data: {
          ...updateRealtimeCustomerEachDayPickupDto,
        },
        include: {
          customer_order_header: {
            include: {
              user: {
                include: {
                  user_detail: true,
                  customer_detail: true,
                },
              },
              driver_order_header: {
                include: {
                  user: {
                    include: {
                      user_detail: true,
                      driver_detail: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    );
    return updatePickup;
  }
}
