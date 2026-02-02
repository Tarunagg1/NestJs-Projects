import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { KAFKA_SERVICE } from '@app/kafka';
import { DatabaseService } from '@app/database';


describe('AuthServiceController', () => {
  let authServiceService: AuthServiceService;

  // create mock objects

  const mockKafkaClient = {
    emit: jest.fn(),
    connect: jest.fn(),
  };

  const mockDatabaseService = {
    createUser: jest.fn().mockReturnThis(),
    findUserByEmail: jest.fn().mockReturnThis(),
    findUserById: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),

    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn().mockReturnThis(),
    execute: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthServiceController],
      providers: [
        AuthServiceService,
        { provide: KAFKA_SERVICE, useValue: mockKafkaClient },
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: 'JwtService', useValue: mockJwtService },
      ],
    }).compile();

    authServiceService = module.get<AuthServiceService>(AuthServiceService);

    jest.clearAllMocks();
  })


  describe('gethello', () => {
    it('should return "Hello from Auth Service!"', async () => {
      const actualResult = await authServiceService.getHello();
      const result = 'Hello from Auth Service!';
      expect(actualResult).toBe(result);
    })

  })
});


