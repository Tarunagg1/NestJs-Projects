import { Test, TestingModule } from '@nestjs/testing';
import { PrismaBookActionService } from './prisma-book-action.service';

describe('PrismaBookActionService', () => {
  let service: PrismaBookActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaBookActionService],
    }).compile();

    service = module.get<PrismaBookActionService>(PrismaBookActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
