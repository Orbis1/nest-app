import { Test, TestingModule } from '@nestjs/testing';
import { AutoExService } from './auto-ex.service';

describe('AutoExService', () => {
  let service: AutoExService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoExService],
    }).compile();

    service = module.get<AutoExService>(AutoExService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
