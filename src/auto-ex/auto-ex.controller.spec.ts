import { Test, TestingModule } from '@nestjs/testing';
import { AutoExController } from './auto-ex.controller';

describe('AutoExController', () => {
  let controller: AutoExController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoExController],
    }).compile();

    controller = module.get<AutoExController>(AutoExController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
