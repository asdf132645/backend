// combined.service.ts

import { Injectable } from '@nestjs/common';
import * as net from 'net';
import { Server, Socket } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LoggerService } from '../logger.service';

@Injectable()
@WebSocketGateway({
  transports: ['websocket'],
  cors: { origin: '*', allowedHeaders: '*' },
})
export class CombinedService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  wss: Server;
  connectedClient: net.Socket | null = null;
  private isTcpConnected: boolean = false;
  public count: number = 0; // 요청 처리 횟수를 저장하는 변수 추가

  constructor(private readonly logger: LoggerService) {}

  afterInit(server: Server) {
    this.wss = server;
    // this.startTcpServer(11235);
    this.setupTcpClient('localhost', 11235);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(
      `WebSocket 클라이언트 연결 끊김: ${client.conn.remoteAddress}`,
    );
  }

  // 웹소켓 통신
  handleConnection(client: Socket) {
    this.logger.log(`WebSocket 클라이언트 연결됨: ${client.conn}`);

    client.on('message', (message) => {
      try {
        if (this.wss) {
          // this.logger.log(message);
          this.webSocketGetData(message);
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

  // handleTcpData 메서드 수정
  handleTcpData(data: any): void {
    const jsonData = data.toString('utf-8');
    if (this.wss) {
      this.sendDataToWebSocketClients(jsonData);
    } else {
      this.logger.error('WebSocketService가 초기화되지 않았습니다.');
    }
  }

  webSocketGetData(message: any): void {
    this.sendDataToEmbeddedServer(message);

    if (!this.connectedClient || this.connectedClient.destroyed) {
      this.setupTcpClient('localhost', 11235);
    }
  }

  sendDataToWebSocketClients(data: any) {
    if (!this.wss) {
      console.log('없다는데..?');
    }

    if (this.wss) {
      // this.logger.log('프론트로 다시 보내기');
      // console.log(data);
      const jsonData = JSON.stringify({ bufferData: data.toString() });
      this.wss.emit('chat', jsonData);
    } else {
      this.logger.warn('웹소켓 전송 실패..');
    }
  }

  sendDataToEmbeddedServer(data: any): void {
    if (this.connectedClient && !this.connectedClient.destroyed) {
      try {
        const serializedData = JSON.stringify(data.payload);
        this.connectedClient.write(serializedData);
      } catch (error) {
        this.logger.error(`데이터 직렬화 오류: ${error.message}`);
      }
    } else {
      this.logger.warn(
        '활성화된 TCP 클라이언트 연결 없음. 데이터 전송되지 않았습니다.???',
      );
    }
  }

  stopTcpServer(): void {
    if (this.connectedClient) {
      this.connectedClient.destroy();
    }
  }

  setupTcpClient(newAddress: string, newPort: number): void {
    if (!this.connectedClient || this.connectedClient.destroyed) {
      const newClient = new net.Socket();
      newClient.connect(newPort, newAddress, () => {
        this.connectedClient = newClient;
        console.log('setupTcpClient');
      });

      newClient.on('data', (data) => {
        // this.logger.log(`업데이트된 클라이언트로부터 데이터 수신: ${data}`);
        this.handleTcpData(data);
      });

      newClient.on('end', () => {
        this.logger.log('TCP 클라이언트 연결 종료');
        this.connectedClient = null;
      });

      newClient.on('error', (err) => {
        this.logger.error(`TCP 클라이언트 오류: ${err.message}`);
      });
    } else {
      this.logger.warn('이미 클라이언트 연결이 활성화되어 있습니다.');
    }
  }
}
