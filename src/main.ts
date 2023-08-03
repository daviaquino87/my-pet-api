import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@/app.module';
import { env } from '@/modules/common/configs/env.config';

function enableDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('my-pet')
    .setDescription('Financial control with you pet')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (env.NODE_ENV != 'production') enableDocumentation(app);

  await app.listen(env.PORT);
}
bootstrap();
