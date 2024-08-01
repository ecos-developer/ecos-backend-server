import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const newNotif = await this.prisma.notification.create({
      data: {
        ...createNotificationDto,
      },
    });
    return newNotif;
  }

  async findAll() {
    const notifications = await this.prisma.notification.findMany({
      include: {
        user: {
          include: {
            user_detail: true,
            customer_detail: true,
            driver_detail: {
              include: {
                payment: true,
              },
            },
          },
        },
      },
    });
    return notifications;
  }

  async findOne(notification_id: string) {
    const notifications = await this.prisma.notification.findFirst({
      where: {
        notification_id,
      },
      include: {
        user: {
          include: {
            user_detail: true,
            customer_detail: true,
            driver_detail: {
              include: {
                payment: true,
              },
            },
          },
        },
      },
    });
    return notifications;
  }

  async findByUserId(user_id: string) {
    const notifications = await this.prisma.user.findFirst({
      where: {
        user_id,
      },
      include: {
        user_detail: true,
        customer_detail: true,
        driver_detail: {
          include: {
            payment: true,
          },
        },
        notification: true,
      },
    });
    return notifications;
  }

  async update(
    notification_id: string,
    updateNotificationDto: UpdateNotificationDto,
  ) {
    const updateNotif = await this.prisma.notification.update({
      where: {
        notification_id,
      },
      data: {
        ...updateNotificationDto,
      },
    });
    return updateNotif;
  }
}
