import { Test, TestingModule } from '@nestjs/testing';
import { RealtimeLocationController } from './realtime-location.controller';
import { RealtimeLocationService } from './realtime-location.service';

describe('RealtimeLocationController', () => {
  let controller: RealtimeLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealtimeLocationController],
      providers: [RealtimeLocationService],
    }).compile();

    controller = module.get<RealtimeLocationController>(RealtimeLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
