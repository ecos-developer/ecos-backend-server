import { Test, TestingModule } from '@nestjs/testing';
import { RealtimeLocationService } from './realtime-location.service';

describe('RealtimeLocationService', () => {
  let service: RealtimeLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealtimeLocationService],
    }).compile();

    service = module.get<RealtimeLocationService>(RealtimeLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
