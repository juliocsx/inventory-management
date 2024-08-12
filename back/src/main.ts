import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let prefix = '';
  switch (process.env.NODE_ENV) {
    case 'development':
      prefix = 'dev/';
      break;
    case 'test':
      prefix = 'test/';
      break;
    case 'production':
      prefix = '';
      break;
    default:
      prefix = ''
      break;
  }

  app.setGlobalPrefix(`${prefix}api`, { exclude: ['/'] });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ||3000);
}
bootstrap();
