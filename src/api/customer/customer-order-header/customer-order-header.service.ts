import { Injectable } from '@nestjs/common';
import { CreateCustomerOrderHeaderDto } from './dto/create-customer-order-header.dto';
import { UpdateCustomerOrderHeaderDto } from './dto/update-customer-order-header.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { NotificationService } from 'src/api/notification/notification.service';

@Injectable()
export class CustomerOrderHeaderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sse: SseConfigService,
    private readonly firebase: FirebaseService,
    private readonly notification: NotificationService,
  ) {}
  async create(createCustomerOrderHeaderDto: CreateCustomerOrderHeaderDto) {
    const newCustomerOrder = await this.prisma.customerOrderHeader.create({
      data: {
        ...createCustomerOrderHeaderDto,
      },
      include: {
        user: {
          include: {
            user_detail: true,
          },
        },
        payment_header: true,
        driver_order_header: {
          include: {
            user: {
              include: {
                user_detail: true,
              },
            },
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

    // SUCCESS CREATE CUSTOMER ORDER HEADER NOTIF FOR CUSTOMER
    const customerNotifData = {
      title: 'Your order request has been sent',
      body: `Successfully created new order for driver named ${newCustomerOrder.driver_order_header.user.user_detail.name}!`,
      user_id: newCustomerOrder.user_id,
    };
    await this.notification.handlePushNotification(customerNotifData);

    // SUCCESS CREATE CUSTOMER ORDER HEADER NOTIF FOR DRIVER
    const driverNotifData = {
      title: 'You has new order from customer',
      body: `New order request from customer name ${newCustomerOrder.user.user_detail.name}!`,
      user_id: newCustomerOrder.driver_order_header.user.user_id,
    };
    await this.notification.handlePushNotification(driverNotifData);

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
                admin_time_block: true,
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
          user: {
            include: {
              user_detail: true,
            },
          },
          payment_header: true,
          driver_order_header: {
            include: {
              user: {
                include: {
                  user_detail: true,
                },
              },
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

    updateCustomerOrderHeader.cancel_pergi;
    updateCustomerOrderHeader.cancel_pulang;

    // DRIVER APPROVED
    if (
      updateCustomerOrderHeader.is_driver_approved &&
      !updateCustomerOrderHeader.cancel_pergi &&
      !updateCustomerOrderHeader.cancel_pulang
    ) {
      const customerNotifData = {
        title: 'Your order has been approved',
        body: `Successfully update order for driver named ${updateCustomerOrderHeader.driver_order_header.user.user_detail.name}!`,
        user_id: updateCustomerOrderHeader.user_id,
      };
      await this.notification.handlePushNotification(customerNotifData);
    }

    // CANCEL PERGI
    if (
      updateCustomerOrderHeader.cancel_pergi &&
      !updateCustomerOrderHeader.cancel_pulang
    ) {
      const customerNotifData = {
        title: `A customer cancel a trip`,
        body: `Customer name ${updateCustomerOrderHeader.user.user_detail.name} cancels for trip to school tomorrow`,
        user_id: updateCustomerOrderHeader.user_id,
      };
      await this.notification.handlePushNotification(customerNotifData);
    }

    // CANCEL PULANG
    if (
      !updateCustomerOrderHeader.cancel_pergi &&
      updateCustomerOrderHeader.cancel_pulang
    ) {
      const customerNotifData = {
        title: `A customer cancel a trip`,
        body: `Customer name ${updateCustomerOrderHeader.user.user_detail.name} cancels for trip back home`,
        user_id: updateCustomerOrderHeader.user_id,
      };
      await this.notification.handlePushNotification(customerNotifData);
    }

    // CANCEL PULANG & PERGI
    if (
      updateCustomerOrderHeader.cancel_pergi &&
      updateCustomerOrderHeader.cancel_pulang
    ) {
      const customerNotifData = {
        title: `A customer cancel a trip`,
        body: `Customer name ${updateCustomerOrderHeader.user.user_detail.name} cancels both trips`,
        user_id: updateCustomerOrderHeader.user_id,
      };
      await this.notification.handlePushNotification(customerNotifData);
    }

    return updateCustomerOrderHeader;
  }

  async delete(customer_order_id: string) {
    const deleteCustomerOrder = await this.prisma.customerOrderHeader.delete({
      where: {
        customer_order_id,
      },
    });
    return deleteCustomerOrder;
  }
}
