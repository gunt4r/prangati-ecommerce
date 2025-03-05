/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import "reflect-metadata"
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true,
  });
  app.use('/uploads', express.static(
    join(__dirname, '..', '..', 'prangati', 'public', 'uploads')
  ));
  await app.init()
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
