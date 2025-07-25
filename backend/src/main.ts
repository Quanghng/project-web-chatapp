import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:5174',   // For development
    'http://localhost:80', // For local development or if running frontend locally
    'http://localhost',    // Another common local dev port
    'http://localhost:3000', // React dev server default
    'http://efrei-chatapp.duckdns.org',
    process.env.FRONTEND_URL,
  ]
  // Enable CORS 
  app.enableCors({
    origin: allowedOrigins,
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
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
