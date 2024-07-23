import { Injectable } from '@nestjs/common';
import { CreateRealtimeLocationDto } from './dto/create-realtime-location.dto';
import { UpdateRealtimeLocationDto } from './dto/update-realtime-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RealtimeLocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRealtimeLocationDto: CreateRealtimeLocationDto) {
    const newLoc = await this.prisma.realtimeLocation.create({
      data: {
        ...createRealtimeLocationDto,
      },
      include: {
        user: {
          include: {
            user_detail: true,
            customer_detail: true,
            driver_detail: true,
          },
        },
      },
    });
    return newLoc;
  }

  async findAll() {
    const allLoc = await this.prisma.realtimeLocation.findMany({
      include: {
        user: {
          include: {
            user_detail: true,
            customer_detail: true,
            driver_detail: true,
          },
        },
      },
    });
    return allLoc;
  }

  async findOne(user_id: string) {
    const findLoc = await this.prisma.realtimeLocation.findFirst({
      where: {
        user_id,
      },
      include: {
        user: {
          include: {
            user_detail: true,
            customer_detail: true,
            driver_detail: true,
          },
        },
      },
    });
    return findLoc;
  }

  async update(
    user_id: string,
    updateRealtimeLocationDto: UpdateRealtimeLocationDto,
  ) {
    const updateLoc = await this.prisma.realtimeLocation.update({
      where: {
        user_id,
      },
      data: {
        ...updateRealtimeLocationDto,
      },
      include: {
        user: {
          include: {
            user_detail: true,
            customer_detail: true,
            driver_detail: true,
          },
        },
      },
    });
    return updateLoc;
  }
}
