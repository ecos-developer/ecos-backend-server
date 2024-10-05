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
    // SUCCESS CREATE ADMIN TIME BLOCK NOTIF FOR ADMIN
    const adminNotifData = {
      title: 'New customer order has been created',
      body: `New customer is successfully created from customer name ${newCustomerOrder.user.user_detail.name}`,
      user_id: newCustomerOrder.driver_order_header.admin_time_block.user_id,
    };
    this.notification.handlePushNotification(adminNotifData);

    // SUCCESS CREATE ADMIN TIME BLOCK NOTIF FOR CUSTOMER
    const customerNotifData = {
      title: 'Your order has been created',
      body: `Successfully created new order for driver named ${newCustomerOrder.driver_order_header.user.user_detail.name}!`,
      user_id: newCustomerOrder.driver_order_header.admin_time_block.user_id,
    };
    this.notification.handlePushNotification(customerNotifData);

    // SUCCESS CREATE ADMIN TIME BLOCK NOTIF FOR DRIVER
    const driverNotifData = {
      title: 'New order request',
      body: `New order request from customer name ${newCustomerOrder.user.user_detail.name}!`,
      user_id: newCustomerOrder.driver_order_header.admin_time_block.user_id,
    };
    this.notification.handlePushNotification(driverNotifData);

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

    // SUCCESS CREATE ADMIN TIME BLOCK NOTIF FOR ADMIN
    const adminNotifData = {
      title: 'Customer order has been updated',
      body: `Customer is successfully updated from customer name ${updateCustomerOrderHeader.user.user_detail.name}`,
      user_id:
        updateCustomerOrderHeader.driver_order_header.admin_time_block.user_id,
    };
    this.notification.handlePushNotification(adminNotifData);

    // SUCCESS CREATE ADMIN TIME BLOCK NOTIF FOR CUSTOMER
    const customerNotifData = {
      title: 'Your order has been updated',
      body: `Successfully update order for driver named ${updateCustomerOrderHeader.driver_order_header.user.user_detail.name}!`,
      user_id:
        updateCustomerOrderHeader.driver_order_header.admin_time_block.user_id,
    };
    this.notification.handlePushNotification(customerNotifData);

    // SUCCESS CREATE ADMIN TIME BLOCK NOTIF FOR DRIVER
    const driverNotifData = {
      title: 'Order request has been updated',
      body: `Order request has been updated for customer name ${updateCustomerOrderHeader.user.user_detail.name}!`,
      user_id:
        updateCustomerOrderHeader.driver_order_header.admin_time_block.user_id,
    };
    this.notification.handlePushNotification(driverNotifData);

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
