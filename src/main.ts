// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { createLisTypeOrmOptions } from '../ormconfig';

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule);

  // CORS 에러 이슈로 프론트 8080 허용
  const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  httpApp.enableCors(corsOptions);
  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('api 정의')
    .setDescription('uimd 웹 백엔드 req, res 정의')
    .setVersion('1.0')
    .addTag('your-tag')
    .build();

  const document = SwaggerModule.createDocument(httpApp, config);

  SwaggerModule.setup('api', httpApp, document);

  await httpApp.listen(3002);

  // const lisApp = await NestFactory.create(AppModule);
  //
  // const lisDatabaseOptions = await createLisTypeOrmOptions();
  // await lisApp.use(TypeOrmModule.forRoot(lisDatabaseOptions));
  //
  // // lisApp를 3003 포트로 열기
  // await lisApp.listen(3003);
}

bootstrap();
