import { Test, TestingModule } from '@nestjs/testing';
import { RealtimeCustomerEachDayPickupController } from './realtime-customer-each-day-pickup.controller';
import { RealtimeCustomerEachDayPickupService } from './realtime-customer-each-day-pickup.service';

describe('RealtimeCustomerEachDayPickupController', () => {
  let controller: RealtimeCustomerEachDayPickupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealtimeCustomerEachDayPickupController],
      providers: [RealtimeCustomerEachDayPickupService],
    }).compile();

    controller = module.get<RealtimeCustomerEachDayPickupController>(RealtimeCustomerEachDayPickupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
