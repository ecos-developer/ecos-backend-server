import { Injectable } from '@nestjs/common';
import { CreateRealtimeCustomerEachDayPickupDto } from './dto/create-realtime-customer-each-day-pickup.dto';
import { UpdateRealtimeCustomerEachDayPickupDto } from './dto/update-realtime-customer-each-day-pickup.dto';

@Injectable()
export class RealtimeCustomerEachDayPickupService {
  create(createRealtimeCustomerEachDayPickupDto: CreateRealtimeCustomerEachDayPickupDto) {
    return 'This action adds a new realtimeCustomerEachDayPickup';
  }

  findAll() {
    return `This action returns all realtimeCustomerEachDayPickup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} realtimeCustomerEachDayPickup`;
  }

  update(id: number, updateRealtimeCustomerEachDayPickupDto: UpdateRealtimeCustomerEachDayPickupDto) {
    return `This action updates a #${id} realtimeCustomerEachDayPickup`;
  }

  remove(id: number) {
    return `This action removes a #${id} realtimeCustomerEachDayPickup`;
  }
}
