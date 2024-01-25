//communication.service.ts
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Server, Socket } from 'socket.io';
import { Communication } from './interface/communication.interface';
import { TcpServerService } from  './tcpServer.service';
import { WebSocketService } from './webSocket.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager'; // Import CACHE_MANAGER
import { Cache } from 'cache-manager';
@Injectable()
export class CommunicationService implements Communication {
  wss: Server;
  tcpServerService: TcpServerService | undefined;
  webSocketService: WebSocketService | undefined;


  constructor(
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    // private readonly tcpServerGateway: TcpServerGateway,
  ) {
    this.setTcpService(new TcpServerService(logger, cacheManager));
    this.setWebSocketService(new WebSocketService(logger, cacheManager));
  }





  setTcpService(tcpServerService: TcpServerService): void {
    this.tcpServerService = tcpServerService;
  }

  setWebSocketService(webSocketService: WebSocketService): void {
    this.webSocketService = webSocketService;
  }



  sendData?(data: any): void {
    // Implementation
  }

  handleData?(data: any): void {
    // Implementation
  }


  handleTcpData?(data: any): void {
    // Implementation
  }

  // 웹소켓으로 받은 데이터 tcp 로 전달
  websocketTransferTcp(message: any, wss: any): void {
    // WebSocket으로 받은 데이터를 TCP 서버로 전달
    if (this.tcpServerService) {
      if(wss){
        this.tcpServerService.websocketTransferTcp(message, wss);
      }
    } else {
      console.error('TcpServerService is not initialized.');
    }
  }



  start?(port: number): void {
    // Implementation
  }

  stop?(): void {
    // Implementation
  }

  setupClient?(newAddress: string, newPort: number, data?: any): void {
    // Implementation
  }

  //tcp 값을 클라이언트로 보내는 코드
  sendDataToWebSocketClients?(data: any, wss: any): void {
    // WebSocketService가 초기화되어 있지 않다면 초기화
    if(this.webSocketService){
      // console.log('최종 wss 전달 하는곳 tcp서비스가 실행시키는곳')
      // console.log(wss)
      this.webSocketService.sendDataToWebSocketClients(data, wss);
      console.log('웹소켓 이벤트실행~')
    }else{
      console.error('webSocketService 연결 실패.');
    }
  }
  // WebSocket 서버 초기화 여부 확인 메소드 추가
  isWssInitialized?(): boolean {
    return this.webSocketService.isWssInitialized();
  }
  getWebSocketServer?(): any{
    this.webSocketService.getWebSocketServer();
  }
}
