import { KAFKA_SERVICE, KAFKA_TOPIC } from '@app/kafka';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AuthServiceService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient,
  ) { }

  async onModuleInit() {
    // Initialization logic here
    await this.kafkaClient.connect();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async simulateKafkaUserRegistration(message: any) {
    this.kafkaClient.emit(KAFKA_TOPIC.USER_REGISTERED, {
      userId: message.userId,
      email: message.email,
      timestamp: Date.now(),
    });
    return {
      message: 'User registration event emitted'
    }
  }
}
