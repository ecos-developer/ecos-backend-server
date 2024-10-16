import { Injectable } from '@nestjs/common';
import { CreateDriverOrderHeaderDto } from './dto/create-driver-order-header.dto';
import { UpdateDriverOrderHeaderDto } from './dto/update-driver-order-header.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { NotificationService } from 'src/api/notification/notification.service';

@Injectable()
export class DriverOrderHeaderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sse: SseConfigService,
    private readonly firebase: FirebaseService,
    private readonly notification: NotificationService,
  ) {}

  async create(createDriverOrderHeaderDto: CreateDriverOrderHeaderDto) {
    const newDriverOrderHeader = await this.prisma.driverOrderHeader.create({
      data: {
        driver_id: createDriverOrderHeaderDto.driver_id,
        time_block_id: createDriverOrderHeaderDto.time_block_id,
        is_admin_approved: false,
        is_ongoing: false,
      },
      include: {
        admin_time_block: {
          include: {
            user: true,
          },
        },
        user: {
          include: {
            user_detail: true,
          },
        },
      },
    });
    await this.firebase.driverOrderHeaderForAdminRealtime(
      this.sse.DRIVERORDERHEADER_OBSERVABLE_STRING,
    );
    await this.firebase.driverOrderHeaderEachRealtime(
      this.sse.DRIVERORDERHEADER_OBSERVABLE_STRING,
      newDriverOrderHeader.order_id,
    );

    // SUCCESS CREATE DRIVER ORDER NOTIF FOR ADMIN
    const adminNotifData = {
      title: 'New wave registration from driver',
      body: `Please check new wave registration from driver with name ${newDriverOrderHeader.user.user_detail.name}`,
      user_id: newDriverOrderHeader.admin_time_block.user_id,
    };
    await this.notification.handlePushNotification(adminNotifData);

    // SUCCESS CREATE DRIVER ORDER NOTIF FOR DRIVER
    const driverNotifData = {
      title: 'Success create new order',
      body: 'You have successfully create new order, cant wait to get your first passenger!',
      user_id: createDriverOrderHeaderDto.driver_id,
    };
    await this.notification.handlePushNotification(driverNotifData);

    return newDriverOrderHeader;
  }

  async findAll() {
    const allDriverOrderHeader = await this.prisma.driverOrderHeader.findMany({
      orderBy: {
        created_at: 'desc',
      },
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
        customer_order_header: {
          include: {
            payment_header: true,
            user: {
              include: {
                user_detail: true,
                customer_detail: true,
              },
            },
          },
        },
        admin_time_block: true,
      },
    });

    return allDriverOrderHeader;
  }

  async findByPairs(driver_id: string, time_block_id: string) {
    const driverOrderHeader = await this.prisma.driverOrderHeader.findFirst({
      where: {
        driver_id,
        time_block_id,
      },
    });
    return driverOrderHeader;
  }

  async findOne(id: string) {
    const driverOrderById = await this.prisma.driverOrderHeader.findFirst({
      where: {
        order_id: id,
      },
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
        customer_order_header: {
          include: {
            payment_header: true,
            user: {
              include: {
                user_detail: true,
                customer_detail: true,
              },
            },
          },
        },
        admin_time_block: true,
      },
    });

    return driverOrderById;
  }

  async findByUserIdDriver(user_id: string) {
    const driverOrderById = await this.prisma.user.findFirst({
      where: {
        user_id,
      },
      include: {
        user_detail: true,
        driver_detail: {
          include: {
            payment: true,
          },
        },
        driver_order_header: {
          orderBy: {
            created_at: 'desc',
          },
          include: {
            admin_time_block: true,
            customer_order_header: {
              include: {
                payment_header: true,
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
      include: {
        admin_time_block: {
          include: {
            user: true,
          },
        },
        user: {
          include: {
            user_detail: true,
          },
        },
      },
      data: {
        ...updateDriverOrderHeaderDto,
      },
    });
    await this.firebase.driverOrderHeaderForAdminRealtime(
      this.sse.DRIVERORDERHEADER_OBSERVABLE_STRING,
    );
    await this.firebase.driverOrderHeaderEachRealtime(
      this.sse.DRIVERORDERHEADER_OBSERVABLE_STRING,
      id,
    );

    // SUCCESS UPDATE DRIVER ORDER NOTIF FOR DRIVER
    const driverNotifData = {
      title: 'Your wave registration is approved',
      body: 'Congrats, now you are ready to pickups passengers!',
      user_id: updateDriverOrderById.user.user_id,
    };
    await this.notification.handlePushNotification(driverNotifData);

    return updateDriverOrderById;
  }

  async delete(order_id: string) {
    const deleteDriverOrderById = await this.prisma.driverOrderHeader.delete({
      where: {
        order_id,
      },
      include: {
        admin_time_block: true,
        user: {
          include: {
            user_detail: true,
          },
        },
      },
    });
    await this.firebase.driverOrderHeaderForAdminRealtime(
      this.sse.DRIVERORDERHEADER_OBSERVABLE_STRING,
    );
    // SUCCESS DELETE DRIVER ORDER NOTIF FOR ADMIN
    const adminNotifData = {
      title: 'Driver wave registration has been deleted',
      body: `Driver's wave registration with name ${deleteDriverOrderById.user.user_detail.name} has been deleted!`,
      user_id: deleteDriverOrderById.admin_time_block.user_id,
    };
    await this.notification.handlePushNotification(adminNotifData);

    // SUCCESS DELETE DRIVER ORDER NOTIF FOR DRIVER
    const driverNotifData = {
      title: 'Your wave registration has been deleted',
      body: 'You wave registration has been deleted by system',
      user_id: deleteDriverOrderById.user.user_id,
    };
    await this.notification.handlePushNotification(driverNotifData);

    return deleteDriverOrderById;
  }
}
