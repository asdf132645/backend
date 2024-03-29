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
import * as dotenv from 'dotenv';

dotenv.config(); // dotenv 설정 추가

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
  public count: number = 0; // 요청 처리 횟수를 저장하는 변수 추가
  public reqArr: any = [];
  public prevReqDttm: string | null = null; // 직전 요청의 reqDttm 저장

  constructor(private readonly logger: LoggerService) {}

  // 이전 reqDttm 값을 갱신하는 함수
  updatePrevReqDttm(reqDttm: string) {
    this.prevReqDttm = reqDttm;
  }

  afterInit(server: Server) {
    this.wss = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(
      `WebSocket 클라이언트 연결 끊김: ${client.conn.remoteAddress}`,
    );
  }

  extractIPAddress(inputString: string | string[]): string | null {
    if (Array.isArray(inputString)) {
      // inputString이 배열인 경우
      return null; // 또는 다른 처리
    }
    const ipAddressRegex = /\d+\.\d+\.\d+\.\d+/;
    const ipAddressMatch = inputString.match(ipAddressRegex);
    return ipAddressMatch ? ipAddressMatch[0] : null;
  }

  // 웹소켓 통신
  handleConnection(client: Socket) {
    const clientIpAddress =
      client.handshake.headers['x-real-ip'] || client.conn.remoteAddress;
    const ipAddress = this.extractIPAddress(clientIpAddress);

    // this.logger.log(`WebSocket 클라이언트 연결됨: ${client.conn}`);

    client.on('message', (message) => {
      try {
        if (this.wss) {
          // this.logger.log(message);
          if (ipAddress !== process.env.DB_HOST) {
            return;
          }
          // console.log(clientIpAddress);
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
      let jsonData = '';
      if (data?.err) {
        jsonData = JSON.stringify({ bufferData: 'err' });
      } else {
        jsonData = JSON.stringify({ bufferData: data.toString() });
      }
      this.wss.emit('chat', jsonData);
    } else {
      this.logger.warn('웹소켓 전송 실패..');
    }
  }

  sendDataToEmbeddedServer(data: any): void {
    if (this.connectedClient && !this.connectedClient.destroyed) {
      try {
        console.log(data.payload);
        const seData = [data.payload];
        for (const seDataKey in seData) {
          const serializedData = JSON.stringify(seData[seDataKey]);
          this.connectedClient.write(serializedData);
        }
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
        this.sendDataToWebSocketClients({ err: true });
        this.connectedClient = null;
      });

      newClient.on('error', (err) => {
        this.logger.error(`TCP 클라이언트 오류: ${err.message}`);
        this.sendDataToWebSocketClients({ err: true });
      });
    } else {
      this.logger.warn('이미 클라이언트 연결이 활성화되어 있습니다.');
    }
  }
}
