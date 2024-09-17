import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertAdminTimeBlockDto } from './dto/insert-admin-time-block.dto';
import { UpdateAdminTimeBlockDto } from './dto/update-admin-time-block.dto';
import { SseConfigService } from 'src/config/sse.config.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AdminTimeBlockService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sse: SseConfigService,
    private readonly firebase: FirebaseService,
  ) {}

  async findAll() {
    const allTimeBlock = await this.prisma.adminTimeBlock.findMany({
      include: {
        user: true,
        driver_order_header: true,
      },
    });

    return allTimeBlock;
  }

  async findById(id: string) {
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

    return currTimeBlock;
  }

  async findByDriverId(user_id: string) {
    const currTimeBlock = await this.prisma.adminTimeBlock.findFirst({
      where: {
        driver_order_header: {
          some: {
            user: {
              user_id,
            },
          },
        },
      },
      include: {
        driver_order_header: {
          include: {
            user: true,
          },
        },
      },
    });

    return currTimeBlock;
  }

  async create(
    user_id: string,
    insertAdminTimeBlockDto: InsertAdminTimeBlockDto,
  ) {
    const newAdminTimeBlock = await this.prisma.user.update({
      where: {
        user_id,
      },
      data: {
        admin_time_block: {
          create: {
            ...insertAdminTimeBlockDto,
          },
        },
      },
      include: {
        admin_time_block: true,
      },
    });
    await this.firebase.customerOrderHeaderForAdminRealtime(
      this.sse.ADMINTIMEBLOCK_OBSERVABLE_STRING,
    );
    return newAdminTimeBlock;
  }

  async updateById(
    id: string,
    updateAdminTimeBlockDto: UpdateAdminTimeBlockDto,
  ) {
    const updateTimeBlock = await this.prisma.adminTimeBlock.update({
      where: {
        time_block_id: id,
      },
      data: {
        ...updateAdminTimeBlockDto,
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
    await this.firebase.customerOrderHeaderForAdminRealtime(
      this.sse.ADMINTIMEBLOCK_OBSERVABLE_STRING,
    );
    await this.firebase.customerOrderHeaderEachRealtime(
      this.sse.CUSTOMERORDERHEADER_OBSERVABLE_STRING,
      id,
    );
    return updateTimeBlock;
  }

  async deleteById(time_block_id: string) {
    const deleteAdminTimeBlock = await this.prisma.adminTimeBlock.delete({
      where: {
        time_block_id,
      },
    });
    await this.firebase.customerOrderHeaderForAdminRealtime(
      this.sse.ADMINTIMEBLOCK_OBSERVABLE_STRING,
    );
    await this.firebase.customerOrderHeaderEachRealtime(
      this.sse.CUSTOMERORDERHEADER_OBSERVABLE_STRING,
      time_block_id,
    );
    return deleteAdminTimeBlock;
  }
}
