import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly event: EventEmitter2,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const newNotif = await this.prisma.notification.create({
      data: {
        ...createNotificationDto,
      },
    });
    const allNotif = await this.findAll();
    this.event.emit('create-notification', allNotif);
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
