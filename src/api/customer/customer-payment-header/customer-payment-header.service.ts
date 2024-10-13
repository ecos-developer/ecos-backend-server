import { Injectable } from '@nestjs/common';
import { CreateCustomerPaymentHeaderDto } from './dto/create-customer-payment-header.dto';
import { UpdateCustomerPaymentHeaderDto } from './dto/update-customer-payment-header.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { NotificationService } from 'src/api/notification/notification.service';

@Injectable()
export class CustomerPaymentHeaderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sse: SseConfigService,
    private readonly firebase: FirebaseService,
    private readonly notification: NotificationService,
  ) {}

  async create(createCustomerPaymentHeaderDto: CreateCustomerPaymentHeaderDto) {
    const expired_at = new Date(new Date().getTime() + 12 * 60 * 60 * 1000);
    const newPaymentHeader = await this.prisma.paymentHeader.create({
      data: {
        ...createCustomerPaymentHeaderDto,
        is_admin_approved: false,
        expired_at,
      },
      include: {
        customer_order_header: {
          include: {
            driver_order_header: {
              include: {
                user: true,
                admin_time_block: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            user: {
              include: {
                user_detail: true,
              },
            },
          },
        },
      },
    });
    await this.firebase.paymentForAdminRealtime(
      this.sse.PAYMENTHEADER_OBSERVABLE_STRING,
    );
    await this.firebase.paymentEachRealtime(
      this.sse.PAYMENTHEADER_OBSERVABLE_STRING,
      newPaymentHeader.customer_payment_id,
    );

    // SUCCESS CREATE CUSTOMER PAYMENT NOTIF FOR ADMIN
    const adminNotifData = {
      title: 'New payment is waiting for approval',
      body: `New payment from user named ${newPaymentHeader.customer_order_header.user.user_detail.name} is waiting for your approval!`,
      user_id:
        newPaymentHeader.customer_order_header.driver_order_header
          .admin_time_block.user_id,
    };
    await this.notification.handlePushNotification(adminNotifData);
    // SUCCESS CREATE CUSTOMER PAYMENT NOTIF FOR DRIVER
    const driverNotifData = {
      title: 'Success create new payment',
      body: `New payment has successfully created for user name ${newPaymentHeader.customer_order_header.user.user_detail.name}, wait for admin approval!`,
      user_id:
        newPaymentHeader.customer_order_header.driver_order_header.user.user_id,
    };
    await this.notification.handlePushNotification(driverNotifData);
    // SUCCESS CREATE CUSTOMER PAYMENT NOTIF FOR USER
    const customerNotifData = {
      title: 'Driver has approved your order',
      body: 'Now you can pay the trip fee',
      user_id: newPaymentHeader.customer_order_header.user_id,
    };
    await this.notification.handlePushNotification(customerNotifData);

    return newPaymentHeader;
  }

  async findAll() {
    const allCustomerPayment = await this.prisma.paymentHeader.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        customer_order_header: {
          include: {
            driver_order_header: {
              include: {
                user: {
                  include: {
                    user_detail: true,
                    driver_detail: true,
                  },
                },
                customer_order_header: {
                  include: {
                    user: {
                      include: {
                        user_detail: true,
                        customer_detail: true,
                      },
                    },
                  },
                },
              },
            },
            user: {
              include: {
                user_detail: true,
                customer_detail: true,
              },
            },
          },
        },
      },
    });
    return allCustomerPayment;
  }

  async findOne(id: string) {
    const findCustomerPayment = await this.prisma.paymentHeader.findFirst({
      where: {
        customer_payment_id: id,
      },
      include: {
        customer_order_header: {
          include: {
            driver_order_header: {
              include: {
                user: {
                  include: {
                    user_detail: true,
                    driver_detail: true,
                  },
                },
                customer_order_header: {
                  include: {
                    user: {
                      include: {
                        user_detail: true,
                        customer_detail: true,
                      },
                    },
                  },
                },
              },
            },
            user: {
              include: {
                user_detail: true,
                customer_detail: true,
              },
            },
          },
        },
      },
    });
    return findCustomerPayment;
  }

  async findByUserId(user_id: string) {
    const findCustomerPayment = await this.prisma.user.findFirst({
      where: {
        user_id,
      },
      include: {
        user_detail: true,
        customer_order_header: {
          include: {
            driver_order_header: {
              include: {
                user: {
                  include: {
                    user_detail: true,
                    driver_detail: true,
                  },
                },
                customer_order_header: {
                  include: {
                    user: {
                      include: {
                        user_detail: true,
                        customer_detail: true,
                      },
                    },
                  },
                },
              },
            },
            payment_header: true,
          },
        },
      },
    });
    return findCustomerPayment;
  }

  async update(
    customer_payment_id: string,
    updateCustomerPaymentHeaderDto: UpdateCustomerPaymentHeaderDto,
  ) {
    const updatePaymentHeader = await this.prisma.paymentHeader.update({
      where: {
        customer_payment_id,
      },
      data: {
        ...updateCustomerPaymentHeaderDto,
      },
      include: {
        customer_order_header: {
          include: {
            driver_order_header: {
              include: {
                user: true,
                admin_time_block: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            user: {
              include: {
                user_detail: true,
              },
            },
          },
        },
      },
    });
    await this.firebase.paymentEachRealtime(
      this.sse.PAYMENTHEADER_OBSERVABLE_STRING,
      customer_payment_id,
    );

    // SUCCESS UPDATE CUSTOMER PAYMENT NOTIF FOR DRIVER
    const driverNotifData = {
      title: 'Customer has paid the trip fee',
      body: `Customer with name ${updatePaymentHeader.customer_order_header.user.user_detail.name} has paid the trip fee!`,
      user_id:
        updatePaymentHeader.customer_order_header.driver_order_header.user
          .user_id,
    };
    await this.notification.handlePushNotification(driverNotifData);
    // SUCCESS UPDATE CUSTOMER PAYMENT NOTIF FOR USER
    const customerNotifData = {
      title: 'Your payment had been approved',
      body: 'Your payment has been updated!',
      user_id: updatePaymentHeader.customer_order_header.user_id,
    };
    await this.notification.handlePushNotification(customerNotifData);

    return updatePaymentHeader;
  }
}
