import { Injectable } from '@nestjs/common';
import { UserDetailDto } from './dto/user_detail.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserDetailService {
  constructor(private prisma: PrismaService) {}

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
    const updateUser = await this.prisma.user.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        role: userDetailDto.role,
        user_detail: {
          update: {
            data: {
              ...userDetailDto,
            },
          },
        },
      },
      include: {
        user_detail: true,
      },
    });
    return updateUser;
  }
}
