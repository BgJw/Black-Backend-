/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 5000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Разрешение доступа со всех доменов
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
  });
  await app.listen(port, "0.0.0.0");
}
bootstrap();
