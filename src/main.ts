import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos não permitidos
      forbidNonWhitelisted: true, // erro se mandar campo extra
      transform: true, // transforma DTO automaticamente
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173', // porta do front
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
