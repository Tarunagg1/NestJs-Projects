import { NestFactory } from '@nestjs/core'; import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { SearchModule } from './search.module';

async function bootstrap() {
  process.title = 'search-service';
  const PORT = Number(process.env.SEARCH_PORT) || 3003;
  const llogger = new Logger('SearchService');

  const rmqURL = process.env.RMQ_URL ?? 'amqp://localhost:5672';
  llogger.log(`Connecting to RMQ at ${rmqURL}`);
  const queue = process.env.SEARCH_QUEUE ?? 'search_queue';
  llogger.log(`Using queue: ${queue}`);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SearchModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rmqURL],
      queue: queue,
    },
  });

  app.enableShutdownHooks();
  await app.listen();

  llogger.log(`Search RMQ listening on ${rmqURL}, via: ${queue}`);
}

bootstrap();
