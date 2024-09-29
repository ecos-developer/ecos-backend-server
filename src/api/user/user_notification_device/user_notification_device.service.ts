import { Injectable } from '@nestjs/common';
import { CreateUserNotificationDeviceDto } from './dto/create-user_notification_device.dto';
import { UpdateUserNotificationDeviceDto } from './dto/update-user_notification_device.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserNotificationDeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserNotificationDeviceDto: CreateUserNotificationDeviceDto,
  ) {
    const newUserNotif = await this.prisma.userNotificationDevices.create({
      data: {
        ...createUserNotificationDeviceDto,
      },
      include: {
        user: {
          include: {
            user_detail: true,
            driver_detail: true,
            customer_detail: true,
          },
        },
      },
    });
    return newUserNotif;
  }

  async findAll() {
    const allUserNotif = await this.prisma.userNotificationDevices.findMany({
      include: {
        user: {
          include: {
            user_detail: true,
            driver_detail: true,
            customer_detail: true,
          },
        },
      },
    });
    return allUserNotif;
  }

  async findOne(user_notification_device_id: string) {
    const findUserNotifById =
      await this.prisma.userNotificationDevices.findFirst({
        where: {
          user_notification_device_id,
        },
        include: {
          user: {
            include: {
              user_detail: true,
              driver_detail: true,
              customer_detail: true,
            },
          },
        },
      });
    return findUserNotifById;
  }

  async findUserById(user_id: string) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        user_id,
      },
    });
    return findUser;
  }

  async findByUserId(user_id: string) {
    const findUserNotifByUserId =
      await this.prisma.userNotificationDevices.findMany({
        where: {
          user: {
            user_id,
          },
        },
        include: {
          user: {
            include: {
              user_detail: true,
              driver_detail: true,
              customer_detail: true,
            },
          },
        },
      });
    return findUserNotifByUserId;
  }

  async update(
    user_notification_device_id: string,
    updateUserNotificationDeviceDto: UpdateUserNotificationDeviceDto,
  ) {
    const updateUserNotifById =
      await this.prisma.userNotificationDevices.update({
        where: {
          user_notification_device_id,
        },
        data: {
          ...updateUserNotificationDeviceDto,
        },
        include: {
          user: {
            include: {
              user_detail: true,
              driver_detail: true,
              customer_detail: true,
            },
          },
        },
      });
    return updateUserNotifById;
  }

  async findByIdAndPushToken(user_id: string, push_token: string) {
    const findByIdandToken =
      await this.prisma.userNotificationDevices.findFirst({
        where: {
          user_id,
          AND: {
            push_token,
          },
        },
        include: {
          user: {
            include: {
              user_detail: true,
              driver_detail: true,
              customer_detail: true,
            },
          },
        },
      });
    return findByIdandToken;
  }

  async removeById(user_notification_device_id: string) {
    const deleteUserNotifById =
      await this.prisma.userNotificationDevices.delete({
        where: {
          user_notification_device_id,
        },
        include: {
          user: {
            include: {
              user_detail: true,
              driver_detail: true,
              customer_detail: true,
            },
          },
        },
      });
    return deleteUserNotifById;
  }
}
