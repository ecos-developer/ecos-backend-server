import { Injectable } from '@nestjs/common';
import { CreateRealtimeCustomerEachDayPickupDto } from './dto/create-realtime-customer-each-day-pickup.dto';
import { UpdateRealtimeCustomerEachDayPickupDto } from './dto/update-realtime-customer-each-day-pickup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { NotificationService } from 'src/api/notification/notification.service';

@Injectable()
export class RealtimeCustomerEachDayPickupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebase: FirebaseService,
    private readonly sse: SseConfigService,
    private readonly notification: NotificationService,
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
    await this.firebase.dailyCustomerPickupByDriverIdRealtime(
      this.sse.DAILYPICKUP_OBSERVABLE_STRING,
      newPickup.customer_order_header.driver_order_header.user.user_id,
    );
    // SUCCESS UPDATE CUSTOMER PAYMENT NOTIF FOR DRIVER
    const driverNotifData = {
      title: 'Success create new daily journey',
      body: `Daily journey has successfully created for user name ${newPickup.customer_order_header.user.user_detail.name}!`,
      user_id: newPickup.customer_order_header.driver_order_header.user.user_id,
    };
    await this.notification.handlePushNotification(driverNotifData);
    // SUCCESS UPDATE CUSTOMER PAYMENT NOTIF FOR USER
    const customerNotifData = {
      title: 'Your daily journey today has started',
      body: 'Get prepare because driver are on the way!',
      user_id: newPickup.customer_order_header.user_id,
    };
    await this.notification.handlePushNotification(customerNotifData);
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
    await this.firebase.dailyCustomerPickupByDriverIdRealtime(
      this.sse.DAILYPICKUP_OBSERVABLE_STRING,
      updatePickup.customer_order_header.driver_order_header.user.user_id,
    );

    // SUCCESS UPDATE CUSTOMER PAYMENT NOTIF FOR DRIVER
    const driverNotifData = {
      title: 'Daily journey has been updated!',
      body: `Daily journey has updated for user name ${updatePickup.customer_order_header.user.user_detail.name}!`,
      user_id:
        updatePickup.customer_order_header.driver_order_header.user.user_id,
    };
    await this.notification.handlePushNotification(driverNotifData);
    // SUCCESS UPDATE CUSTOMER PAYMENT NOTIF FOR USER
    const customerNotifData = {
      title: 'Your daily journey today has updated by driver',
      body: 'Check your latest daily journey status',
      user_id: updatePickup.customer_order_header.user_id,
    };
    await this.notification.handlePushNotification(customerNotifData);
    return updatePickup;
  }

  async delete(pickup_id: string) {
    const deletePickup = await this.prisma.realtimeCustomerEachDayPickup.delete(
      {
        where: {
          pickup_id,
        },
      },
    );
    return deletePickup;
  }
}
