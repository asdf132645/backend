// webSocket.service.ts
import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { Server, Socket } from 'socket.io';
import {
  OnGatewayConnection, OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { TcpServerService } from './tcpServer.service';
import { Communication } from './interface/communication.interface';
import { CommunicationService } from './communication.service';
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
@WebSocketGateway({
  transports: ['websocket'],
  cors: { origin: '*', allowedHeaders: '*' },
})
export class WebSocketService implements Communication, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server;
  communicationService: CommunicationService | undefined;
  // WebSocket 서버 초기화 여부 확인
  isWssInitialized(): any {
    return this.wss;
  }
  constructor(
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // Inject the CacheManager
  ) {}


  setCommunicationService(comse: CommunicationService) {
    this.communicationService = comse;
  }
  handleDisconnect(client: Socket) {
    // handleDisconnect 메서드 내용 추가
    this.logger.log(`WebSocket 클라이언트 연결 끊김: ${client.conn.remoteAddress}`);
  }

  getWebSocketServer(): Server {
    if (!this.wss) {
      console.log('WebSocket 서버가 초기화되지 않았습니다.')
    }
    return this.wss;
  }

  setWss(wss: Server) {
    if (!this.wss) {
      // this.wss = wss;
      // this.logger.log('WebSocket 서버 초기화됨');
      // console.log(2)
    } else {
      this.logger.warn('WebSocket 서버는 이미 초기화되었습니다.');
    }
  }

  afterInit(server: Server) {
    this.setCommunicationService(new CommunicationService(this.logger, this.cacheManager)); // CommunicationService 초기화 추가
    this.wss = server;
    // console.log('serverserverserverserverserver',server)
  }

  sendDataToWebSocketClients(data: any, wss: any) {
    console.log(this.wss)
    if (!this.wss) {
      // this.logger.log('WebSocket 서버가 초기화되지 않았습니다. 초기화 시도 중...');
      // this.setWss(wss);
    }

    if (this.wss) {
      this.logger.log('프론트로 다시 보내기');
      // console.log(data)
      this.wss.emit('chat', data);
    } else {
      this.logger.warn('웹소켓 전송 실패..');
    }
  }


  handleConnection(client: Socket) {
    if (!this.communicationService) {
      return;
    }

    this.logger.log(`WebSocket 클라이언트 연결됨: ${client.conn}`);


    client.on('message', (message) => {
      try {
        if(this.wss){
          this.communicationService?.websocketTransferTcp(message, this.wss);
        }
      } catch (e) {
        this.logger.error(`WebSocket 메시지 처리 중 오류 발생: ${e.message}`);
      }
    });

    client.on('disconnect', () => {
      this.logger.log('WebSocket 클라이언트 연결 끊김');
    });

    client.on('error', (error) => {
      this.logger.error(`WebSocket 클라이언트 오류: ${error.message}`);
    });
  }
}
