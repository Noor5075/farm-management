import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
    // cors: true,
  });
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
  console.log('Allowed Origins:', allowedOrigins);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow if the origin is in the allowed list
        callback(null, true);
      } else {
        // Reject if the origin is not in the allowed list
        callback(new Error('Request rejected: Origin not allowed'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
    credentials: true, // Whether cookies are allowed
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // await app.listen(Number(process.env.PORT) ?? 8080);
  const port = Number(process.env.PORT) ?? 8080;
  console.log(`Application is running on port: ${port}`);
  await app.listen(port);
}
bootstrap();
