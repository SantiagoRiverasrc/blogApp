import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Blog')
    .setDescription('Descripcion de los endpoints de la api de blog')
    .setVersion('1.0')
    .addTag('BLOG')
    .build();

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api-blog', app, document)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  await app.listen(3000);
}
bootstrap();
