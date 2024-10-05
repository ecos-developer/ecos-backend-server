import { Injectable } from '@nestjs/common';
import { UserDetailDto } from './dto/user_detail.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { NotificationService } from 'src/api/notification/notification.service';

@Injectable()
export class UserDetailService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sse: SseConfigService,
    private readonly firebase: FirebaseService,
    private readonly notification: NotificationService,
  ) {}

  async findOne(user: User) {
    const userDetail = await this.prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
      include: {
        user_detail: true,
        driver_detail: {
          include: {
            payment: true,
          },
        },
        customer_detail: true,
      },
    });

    return userDetail;
  }

  async update(user: User, userDetailDto: UserDetailDto) {
    const { role, ...rest } = userDetailDto;
    const updateUser = await this.prisma.user.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        role,
        user_detail: {
          update: {
            data: {
              ...rest,
            },
          },
        },
      },
      include: {
        user_detail: true,
      },
    });
    await this.firebase.userDetailRealtime(
      this.sse.USERDETAIL_OBSERVABLE_STRING,
      user.user_id,
    );
    const notificationData = {
      title: 'Profile Update Successful!',
      body: 'You have successfully updated your profile.',
      user_id: user.user_id,
    };
    await this.notification.handlePushNotification(notificationData);

    return updateUser;
  }
}
