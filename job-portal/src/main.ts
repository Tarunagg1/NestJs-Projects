import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PUTCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
}
bootstrap();
