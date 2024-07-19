import {
  HttpException,
  HttpStatus,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDetailDto } from './dto/create-customer-detail.dto';
import { UpdateCustomerDetailDto } from './dto/update-customer-detail.dto';

@Injectable()
export class DetailService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(user: User) {
    const currUser = await this.prisma.user.findFirst({
      where: {
        user_id: user.user_id,
      },
      include: {
        customer_detail: true,
        user_detail: true,
      },
    });
    if (currUser.role !== Role.CUSTOMER) {
      throw new MethodNotAllowedException(
        `user ${currUser.email} is not customer!`,
      );
    }

    return new HttpException(currUser, HttpStatus.CREATED);
  }

  async create(user: User, createCustomerDetailDto: CreateCustomerDetailDto) {
    const currUser = await this.prisma.user.findFirst({
      where: {
        user_id: user.user_id,
      },
      include: {
        customer_detail: true,
        user_detail: true,
      },
    });
    if (currUser.role !== Role.CUSTOMER) {
      throw new MethodNotAllowedException(
        `user ${currUser.email} is not customer!`,
      );
    }
    if (currUser.customer_detail) {
      throw new MethodNotAllowedException(
        `user ${currUser.email} already create user detail, perform update user detail instead!`,
      );
    }
    const binusianIdCheck = await this.prisma.customerDetail.findFirst({
      where: {
        binusian_id: createCustomerDetailDto.binusian_id,
      },
    });
    if (binusianIdCheck) {
      throw new MethodNotAllowedException(
        `Binusian ID ${createCustomerDetailDto.binusian_id} already used!`,
      );
    }

    const customerDetail = await this.prisma.user.update({
      where: {
        user_id: currUser.user_id,
      },
      include: {
        customer_detail: true,
        user_detail: true,
      },
      data: {
        customer_detail: {
          create: {
            binusian_id: createCustomerDetailDto.binusian_id,
            parent_phone: createCustomerDetailDto.parent_phone,
          },
        },
      },
    });

    return new HttpException(customerDetail, HttpStatus.CREATED);
  }

  async update(user: User, updateCustomerDetailDto: UpdateCustomerDetailDto) {
    const currUser = await this.prisma.user.findFirst({
      where: {
        user_id: user.user_id,
      },
      include: {
        customer_detail: true,
        user_detail: true,
      },
    });
    if (currUser.role !== Role.CUSTOMER) {
      throw new MethodNotAllowedException(
        `user ${currUser.email} is not customer!`,
      );
    }
    if (!currUser.customer_detail) {
      throw new MethodNotAllowedException(
        `user ${currUser.email} is not create user detail yet , perform create user detail instead!`,
      );
    }
    const binusianIdCheck = await this.prisma.customerDetail.findFirst({
      where: {
        binusian_id: updateCustomerDetailDto.binusian_id,
      },
    });
    if (binusianIdCheck) {
      throw new MethodNotAllowedException(
        `Binusian ID ${updateCustomerDetailDto.binusian_id} already used!`,
      );
    }

    const customerDetail = await this.prisma.user.update({
      where: {
        user_id: currUser.user_id,
      },
      include: {
        customer_detail: true,
        user_detail: true,
      },
      data: {
        customer_detail: {
          update: {
            binusian_id: updateCustomerDetailDto.binusian_id
              ? updateCustomerDetailDto.binusian_id
              : currUser.customer_detail.binusian_id,
            parent_phone: updateCustomerDetailDto.parent_phone
              ? updateCustomerDetailDto.parent_phone
              : currUser.customer_detail.parent_phone,
          },
        },
      },
    });

    return new HttpException(customerDetail, HttpStatus.CREATED);
  }
}
