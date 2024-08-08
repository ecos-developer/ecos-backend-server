import { Injectable } from '@nestjs/common';
import { CreateRealtimeLocationDto } from './dto/create-realtime-location.dto';
import { UpdateRealtimeLocationDto } from './dto/update-realtime-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RealtimeLocationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sse: SseConfigService,
    private readonly event: EventEmitter2,
  ) {}

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
    this.event.emit(
      `${this.sse.LOCATION_OBSERVABLE_STRING}/${createRealtimeLocationDto.user_id}`,
      newLoc,
    );
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
    this.event.emit(
      `${this.sse.LOCATION_OBSERVABLE_STRING}/${updateRealtimeLocationDto.user_id}`,
      updateLoc,
    );
    return updateLoc;
  }
}
