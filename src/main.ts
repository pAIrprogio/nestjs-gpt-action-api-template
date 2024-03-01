import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as hbs from 'handlebars';
import { join } from 'path';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import chalk from 'chalk';
import { urlToDirname } from './node.utils.js';

const __dirname = urlToDirname(import.meta.url);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  const configService = app.get(ConfigService);

  app.setViewEngine({
    engine: {
      handlebars: hbs,
    },
    options: {},
    templates: join(__dirname, '..', 'views'),
  });

  // registerPartials();
  const BASE_URL = configService.get('BASE_URL')!;

  const config = new DocumentBuilder()
    .setTitle('GPT Actions API')
    .addServer(BASE_URL)
    .setDescription('Allow a GPT to interact with a backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const host =
    configService.get('ENV') === 'production' ? '0.0.0.0' : '127.0.0.1';

  await app.listen(3000, host);
  console.log(
    chalk.bold("Your actions' config is available at  ") +
      chalk.bold.bgBlue(BASE_URL + '/docs-json'),
  );
}
bootstrap();
