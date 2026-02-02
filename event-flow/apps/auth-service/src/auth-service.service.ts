import { DatabaseService } from '@app/database';
import { users } from '@app/database/schema';
import { KAFKA_SERVICE, KAFKA_TOPIC } from '@app/kafka';
import { ConflictException, Inject, Injectable, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServiceService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient,
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService
  ) { }

  getHello(): string {
    return 'Hello from Auth Service!';
  }

  async onModuleInit() {
    // Initialization logic here
    await this.kafkaClient.connect();
  }

  async register(email: string, password: string, name: string) {
    const existingUser = await this.dbService.db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await this.dbService.db.insert(users).values({
      email,
      passwordHash: hashedPassword,
      name
    }).returning();


    // send user registration to kafka topic
    await this.kafkaClient.emit(KAFKA_TOPIC.USER_REGISTERED, {
      userId: user.id,
      email: user.email,
      name: user.name,
      timestamp: new Date().toISOString()
    })

    return { message: 'User registered successfully', userId: user.id };

  }


  async login(email: string, password: string) {
    const [user] = await this.dbService.db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    this.kafkaClient.emit(KAFKA_TOPIC.USER_LOGIN, {
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString()
    });

    return {
      accessToken: token, user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }

  async getProfile(userId: string) {
    const [user] = await this.dbService.db.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role
    }).from(users).where(eq(users.id, userId)).limit(1);


    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
  }
}
