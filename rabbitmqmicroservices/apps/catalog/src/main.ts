import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'catalog-service';
  const PORT = Number(process.env.CATALOG_PORT) || 3001;
  const rmqURL = process.env.RMQ_URL ?? 'amqp://localhost:5672';
  const queue = process.env.CATALOG_QUEUE ?? 'catalog_queue';

  const llogger = new Logger('CatalogService');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CatalogModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rmqURL],
      queue: queue,
    },
  });

  app.enableShutdownHooks();
  await app.listen();

  llogger.log(`Catalog RMQ listening on ${rmqURL}, via: ${queue}`);

}

bootstrap();
