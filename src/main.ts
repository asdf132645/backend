import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as mysql from 'mysql2/promise';
import { spawn } from 'child_process';

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  // body-parser 미들웨어 추가
  httpApp.use(bodyParser.json({ limit: '50mb' }));
  httpApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  httpApp.use(bodyParser.text({ limit: '50mb', type: 'text/plain' }));

  // CORS 에러 이슈로 프론트 8080 허용
  const corsOptions: CorsOptions = {
    origin: [
      'http://172.30.1.34:8080',
      'http://192.168.0.115:8080',
      'http://127.0.0.1:8080',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  console.log(corsOptions.origin[0]);
  httpApp.enableCors(corsOptions);

  // 전역 프리픽스 설정
  httpApp.setGlobalPrefix('api');

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('api 정의')
    .setDescription('uimd 웹 백엔드 req, res 정의')
    .setVersion('1.0')
    .addTag('your-tag')
    .build();

  const document = SwaggerModule.createDocument(httpApp, config);

  SwaggerModule.setup('api', httpApp, document);

  // MySQL 연결 설정 (관리자 모드로 명령 실행)
  const connection = await mysql.createConnection({
    host: '127.0.0.1', // MySQL 서버 주소
    user: 'root', // MySQL 관리자 계정
    password: 'uimd5191!', // MySQL 관리자 비밀번호
  });

  // MySQL 명령 실행: sort_buffer_size 설정
  await connection.query('SET GLOBAL sort_buffer_size = 4*1024*1024;');
  console.log('MySQL sort_buffer_size 설정 완료');

  // MySQL 연결 종료
  await connection.end();

  if (corsOptions.origin[0] === 'http://192.168.2.229:8080') {
    const expressServerPath =
      'C:\\Users\\user\\AppData\\Local\\Programs\\UIMD\\ywmc-server';

    // Express 서버 실행
    const expressServer = spawn('npm', ['start'], {
      cwd: expressServerPath, // 절대 경로 설정
      stdio: 'inherit',
      shell: true,
    });

    expressServer.on('close', (code) => {
      console.log(`Express 서버가 종료되었습니다. 종료 코드: ${code}`);
    });
  }

  await httpApp.listen(3002);
}

bootstrap();
