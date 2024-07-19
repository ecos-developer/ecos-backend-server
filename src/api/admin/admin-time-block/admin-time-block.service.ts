import {
  HttpException,
  HttpStatus,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertAdminTimeBlockDto } from './dto/insert-admin-time-block.dto';

@Injectable()
export class AdminTimeBlockService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(user: User) {

    const allTimeBlock = await this.prisma.adminTimeBlock.findMany({
      include: {
        user: true,
        driver_order_header: true,
      },
    });

    return new HttpException(allTimeBlock, HttpStatus.CREATED);
  }

  async findById(user: User, id: string) {
    if (id === null || id === undefined || id === '') {
      throw new MethodNotAllowedException(`invalid id value ${id}!`);
    }

    const currTimeBlock = await this.prisma.adminTimeBlock.findFirst({
      where: {
        time_block_id: id,
      },
      include: {
        driver_order_header: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!currTimeBlock) {
      throw new NotFoundException(`time block with id ${id} is not found!`);
    }

    return new HttpException(currTimeBlock, HttpStatus.CREATED);
  }

  async create(user: User, insertAdminTimeBlockDto: InsertAdminTimeBlockDto) {
    const currUser = await this.prisma.user.findFirst({
      where: {
        user_id: user.user_id,
      },
    });

    if (currUser.role !== Role.ADMIN) {
      throw new MethodNotAllowedException(
        `user ${currUser.email} is not admin!`,
      );
    }

    const newAdminTimeBlock = await this.prisma.user.update({
      where: {
        user_id: currUser.user_id,
      },
      data: {
        admin_time_block: {
          create: {
            start_date: insertAdminTimeBlockDto.start_date,
            end_date: insertAdminTimeBlockDto.end_date,
          },
        },
      },
      include: {
        admin_time_block: true,
      },
    });
    return new HttpException(newAdminTimeBlock, HttpStatus.CREATED);
  }

  async updateById(
    user: User,
    id: string,
    insertAdminTimeBlockDto: InsertAdminTimeBlockDto,
  ) {
    if (id === null || id === undefined || id === '') {
      throw new MethodNotAllowedException(`invalid id value ${id}!`);
    }

    const currUser = await this.prisma.user.findFirst({
      where: {
        user_id: user.user_id,
      },
    });

    if (currUser.role !== Role.ADMIN) {
      throw new MethodNotAllowedException(
        `user ${currUser.email} is not admin!`,
      );
    }

    const currTimeBlock = await this.prisma.adminTimeBlock.findFirst({
      where: {
        time_block_id: id,
      },
      include: {
        driver_order_header: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!currTimeBlock) {
      throw new NotFoundException(`time block with id ${id} is not found!`);
    }

    const updateTimeBlock = await this.prisma.adminTimeBlock.update({
      where: {
        time_block_id: id,
      },
      data: {
        start_date: insertAdminTimeBlockDto.start_date,
        end_date: insertAdminTimeBlockDto.end_date,
      },
      include: {
        user: true,
        driver_order_header: {
          include: {
            user: true,
          },
        },
      },
    });

    return new HttpException(updateTimeBlock, HttpStatus.CREATED);
  }
}
