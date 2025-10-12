import { Test, TestingModule } from '@nestjs/testing';
import { BookActionService } from './book-action.service';

describe('BookActionService', () => {
  let service: BookActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookActionService],
    }).compile();

    service = module.get<BookActionService>(BookActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
