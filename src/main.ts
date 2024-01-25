// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ProtocolModule } from './protocol/protocol.module';
// import { TcpServerService } from './protocol/tcpServer.service';
// import { WebSocketService } from './protocol/webSocket.service';
// import { CommunicationService } from './protocol/communication.service';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { CombinedService } from './combinedProtocol/combined.service';
import {CombinedModule} from './combinedProtocol/combined.module';
async function bootstrap() {
  // 먼저 HTTP 서버를 생성합니다.
  const httpApp = await NestFactory.create(AppModule);

  // CORS 에러 이슈로 프론트 8080 허용
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:8080', // 허용할 도메인
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  httpApp.enableCors(corsOptions);

  await httpApp.listen(3002);

  // 그 후 ProtocolModule에서 WebSocketService 및 TcpServerService를 얻어 초기화합니다.
  const protocolApp =
    await NestFactory.createApplicationContext(CombinedModule);

  // const webSocketService = protocolApp.get(WebSocketService);
  // const tcpServerService = protocolApp.get(TcpServerService);

  // WebSocketService가 TCP 서버를 참조하도록 변경
  // const communicationService = protocolApp.get(CommunicationService);
  // webSocketService.setCommunicationService(communicationService);
  const combinedService = protocolApp.get(CombinedService);



}

bootstrap();
