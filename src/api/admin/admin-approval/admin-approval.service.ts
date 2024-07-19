import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApproveUserByIdDto } from './dto/approve-user-by-id.dto';

@Injectable()
export class AdminApprovalService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUser(user: User) {
    // ADMIN VALIDATION
    if (user.role !== Role.ADMIN) {
      throw new MethodNotAllowedException(`user ${user.email} is not admin!`);
    }

    const allCustomer = await this.prisma.user.findMany({
      include: {
        user_detail: true,
      },
      where: {
        role: {
          equals: Role.CUSTOMER,
        },
      },
    });

    const allDriver = await this.prisma.user.findMany({
      include: {
        user_detail: true,
        driver_detail: true,
      },
      where: {
        role: {
          equals: Role.DRIVER,
        },
      },
    });

    return new HttpException(
      {
        customer: allCustomer,
        driver: allDriver,
      },
      HttpStatus.CREATED,
    );
  }

  async approveUserById(user: User, approveUserByIdDto: ApproveUserByIdDto) {
    if (user.role !== Role.ADMIN) {
      throw new MethodNotAllowedException(`user ${user.email} is not admin!`);
    }
    const findUser = await this.prisma.user.findUnique({
      where: {
        user_id: approveUserByIdDto.id,
      },
      include: {
        user_detail: true,
      },
    });
    if (!findUser) {
      throw new BadRequestException(
        `target user ${approveUserByIdDto.id} is not found!`,
      );
    }
    const updateUserDetail = await this.prisma.userDetail.update({
      where: {
        user_id: approveUserByIdDto.id,
      },
      data: {
        is_admin_approved: !findUser.user_detail.is_admin_approved,
      },
    });
    return new HttpException(updateUserDetail, HttpStatus.CREATED);
  }
}
