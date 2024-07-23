import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RealtimeCustomerEachDayPickupService } from './realtime-customer-each-day-pickup.service';
import { CreateRealtimeCustomerEachDayPickupDto } from './dto/create-realtime-customer-each-day-pickup.dto';
import { UpdateRealtimeCustomerEachDayPickupDto } from './dto/update-realtime-customer-each-day-pickup.dto';

@Controller('realtime-customer-each-day-pickup')
export class RealtimeCustomerEachDayPickupController {
  constructor(private readonly realtimeCustomerEachDayPickupService: RealtimeCustomerEachDayPickupService) {}

  @Post()
  create(@Body() createRealtimeCustomerEachDayPickupDto: CreateRealtimeCustomerEachDayPickupDto) {
    return this.realtimeCustomerEachDayPickupService.create(createRealtimeCustomerEachDayPickupDto);
  }

  @Get()
  findAll() {
    return this.realtimeCustomerEachDayPickupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realtimeCustomerEachDayPickupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRealtimeCustomerEachDayPickupDto: UpdateRealtimeCustomerEachDayPickupDto) {
    return this.realtimeCustomerEachDayPickupService.update(+id, updateRealtimeCustomerEachDayPickupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realtimeCustomerEachDayPickupService.remove(+id);
  }
}
