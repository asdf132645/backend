// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpServerModule } from './services/tcp-server.module';
import { TcpServerService } from './services/tcp-server.service';

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule);
  await httpApp.listen(3306);

  const tcpServerApp =
    await NestFactory.createApplicationContext(TcpServerModule);

  const tcpServerService = tcpServerApp.get(TcpServerService);
  tcpServerService.start(11235); // 원하는 TCP 포트로 변경
}
bootstrap();
