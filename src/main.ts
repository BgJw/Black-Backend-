/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Разрешение доступа со всех доменов
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
  });
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
