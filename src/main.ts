import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Rutas 
  app.setGlobalPrefix('api/v2')

  // Validacion  de nuestros Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  await app.listen(process.env.PORT);
  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
