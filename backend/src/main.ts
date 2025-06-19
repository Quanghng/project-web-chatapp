import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS 
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  // Middlewares
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));

  // Global pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Versionning
  app.setGlobalPrefix('api/v1');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('GraphQL Project')
    .setDescription('GraphQL Project description')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
