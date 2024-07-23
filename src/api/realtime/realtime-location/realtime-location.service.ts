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
    });
    return newLoc;
  }

  async findAll() {
    return `This action returns all realtimeLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} realtimeLocation`;
  }

  update(id: number, updateRealtimeLocationDto: UpdateRealtimeLocationDto) {
    return `This action updates a #${id} realtimeLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} realtimeLocation`;
  }
}
