import { Test, TestingModule } from '@nestjs/testing';
import { RealtimeCustomerEachDayPickupService } from './realtime-customer-each-day-pickup.service';

describe('RealtimeCustomerEachDayPickupService', () => {
  let service: RealtimeCustomerEachDayPickupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealtimeCustomerEachDayPickupService],
    }).compile();

    service = module.get<RealtimeCustomerEachDayPickupService>(RealtimeCustomerEachDayPickupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
