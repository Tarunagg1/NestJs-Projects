import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import * as dotenv from 'dotenv';
import { SERVICE_PORTS } from '@app/common';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(SERVICE_PORTS.AUTH_SERVICE);
  console.log(`Auth service listen on port ${SERVICE_PORTS.AUTH_SERVICE}`);

}
bootstrap();