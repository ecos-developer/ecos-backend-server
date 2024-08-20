import { Injectable } from '@nestjs/common';
import { CreateRealtimeCustomerEachDayPickupDto } from './dto/create-realtime-customer-each-day-pickup.dto';
import { UpdateRealtimeCustomerEachDayPickupDto } from './dto/update-realtime-customer-each-day-pickup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';

@Injectable()
export class RealtimeCustomerEachDayPickupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebase: FirebaseService,
    private readonly sse: SseConfigService,
  ) {}

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
    await this.firebase.dailyCustomerPickupForAdminRealtime(
      this.sse.DAILYPICKUP_OBSERVABLE_STRING,
    );
    await this.firebase.dailyCustomerPickupEachRealtime(
      this.sse.DAILYPICKUP_OBSERVABLE_STRING,
      newPickup.pickup_id,
    );
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
    return allPickup;
  }

  async findByDriverId(driver_id: string) {
    const allPickup = await this.prisma.realtimeCustomerEachDayPickup.findMany({
      where: {
        customer_order_header: {
          driver_order_header: {
            driver_id,
          },
        },
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
      },
    );

    await this.firebase.dailyCustomerPickupForAdminRealtime(
      this.sse.DAILYPICKUP_OBSERVABLE_STRING,
    );
    await this.firebase.dailyCustomerPickupEachRealtime(
      this.sse.DAILYPICKUP_OBSERVABLE_STRING,
      pickup_id,
    );
    return updatePickup;
  }
}
