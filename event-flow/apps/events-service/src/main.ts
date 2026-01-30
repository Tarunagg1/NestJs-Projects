import { NestFactory } from '@nestjs/core';
import { EventsServiceModule } from './events-service.module';
import { SERVICE_PORTS } from '@app/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(EventsServiceModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(SERVICE_PORTS.EVENTS_SERVICE);
}
bootstrap();
