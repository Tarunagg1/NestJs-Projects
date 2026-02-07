import { NestFactory } from '@nestjs/core'; import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { MediaModule } from './media.module';

async function bootstrap() {
  process.title = 'media-service';
  const llogger = new Logger('MediaService');

  const rmqURL = process.env.RMQ_URL ?? 'amqp://localhost:5672';
  llogger.log(`Connecting to RMQ at ${rmqURL}`);
  const queue = process.env.MEDIA_QUEUE ?? 'media_queue';
  llogger.log(`Using queue: ${queue}`);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MediaModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rmqURL],
      queue: queue,
    },
  });

  app.enableShutdownHooks();
  await app.listen();

  llogger.log(`Media RMQ listening on ${rmqURL}, via: ${queue}`);
}

bootstrap();
