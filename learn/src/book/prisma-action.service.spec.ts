import { Test, TestingModule } from '@nestjs/testing';
import { PrismaActionService } from './prisma-action.service';

describe('PrismaActionService', () => {
  let service: PrismaActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaActionService],
    }).compile();

    service = module.get<PrismaActionService>(PrismaActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
