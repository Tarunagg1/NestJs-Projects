import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const logger = new Logger('Gateway');
  app.enableShutdownHooks();
  app.enableCors();
  logger.log('Starting Gateway...');
  await app.listen(process.env.GATEWAY_PORT ?? 3000);
}

bootstrap();
