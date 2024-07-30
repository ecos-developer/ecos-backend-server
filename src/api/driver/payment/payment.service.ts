import {
  HttpException,
  HttpStatus,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async findOne(user: User) {
    const currUser = await this.prisma.user.findFirst({
      where: {
        user_id: user.user_id,
      },
      include: {
        driver_detail: {
          include: {
            payment: true,
          },
        },
        user_detail: true,
      },
    });
    if (currUser.role !== Role.DRIVER) {
      throw new MethodNotAllowedException(`user ${user.email} is not driver!`);
    }

    return new HttpException(
      currUser.driver_detail.payment,
      HttpStatus.CREATED,
    );
  }

  async create(user: User, createPaymentDto: CreatePaymentDto) {
    const currUser = await this.prisma.user.findFirst({
      where: {
        user_id: user.user_id,
      },
      include: {
        driver_detail: {
          include: {
            payment: true,
          },
        },
        user_detail: true,
      },
    });
    if (currUser.role !== Role.DRIVER) {
      throw new MethodNotAllowedException(`user ${user.email} is not driver!`);
    }
    if (currUser.driver_detail.payment) {
      throw new MethodNotAllowedException(
        `user ${user.email} payment is already exist! perform update payment instead!`,
      );
    }

    const updateDriverPayment = await this.prisma.user.update({
      where: {
        user_id: currUser.user_id,
      },
      include: {
        driver_detail: {
          include: {
            payment: true,
          },
        },
        user_detail: true,
      },
      data: {
        driver_detail: {
          update: {
            payment: {
              create: {
                name: createPaymentDto.name,
                account_number: createPaymentDto.account_number,
              },
            },
          },
        },
      },
    });

    return new HttpException(
      updateDriverPayment.driver_detail.payment,
      HttpStatus.CREATED,
    );
  }

  async update(user: User, updatePaymentDto: UpdatePaymentDto) {
    const currUser = await this.prisma.user.findFirst({
      where: {
        user_id: user.user_id,
      },
      include: {
        driver_detail: {
          include: {
            payment: true,
          },
        },
        user_detail: true,
      },
    });
    if (currUser.role !== Role.DRIVER) {
      throw new MethodNotAllowedException(`user ${user.email} is not driver!`);
    }
    if (!currUser.driver_detail.payment) {
      const createDriverPayment = await this.prisma.user.update({
        where: {
          user_id: currUser.user_id,
        },
        include: {
          driver_detail: {
            include: {
              payment: true,
            },
          },
          user_detail: true,
        },
        data: {
          driver_detail: {
            update: {
              payment: {
                create: {
                  name: updatePaymentDto.name,
                  account_number: updatePaymentDto.account_number,
                },
              },
            },
          },
        },
      });

      return new HttpException(
        createDriverPayment.driver_detail.payment,
        HttpStatus.CREATED,
      );
    }

    const updateDriverPayment = await this.prisma.user.update({
      where: {
        user_id: currUser.user_id,
      },
      include: {
        user_detail: true,
        driver_detail: {
          include: {
            payment: true,
          },
        },
      },
      data: {
        driver_detail: {
          update: {
            payment: {
              update: {
                account_number: updatePaymentDto.account_number,
                name: updatePaymentDto.name,
              },
            },
          },
        },
      },
    });

    return new HttpException(
      updateDriverPayment.driver_detail.payment,
      HttpStatus.CREATED,
    );
  }
}
