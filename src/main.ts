import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helper/swagger.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Okten')
    .setDescription('Bonus nest js Api example')
    .setVersion('1.0.')
    .addTag('march-2023_Demchuk')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap().then();
