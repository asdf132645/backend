// combined.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as net from 'net';
import { Server, Socket } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

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

  constructor(private readonly logger: Logger) {}

  afterInit(server: Server) {
    this.wss = server;
    this.startTcpServer(11237);
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

  // tcp 통신
  startTcpServer(port: number): void {
    const server = new net.Server();

    server.on('connection', (socket) => {
      if (this.connectedClient) {
        this.connectedClient.destroy();
      }
      this.connectedClient = socket;
      this.logger.log(
        `새로운 연결: ${socket.remoteAddress}:${socket.remotePort}`,
      );

      socket.on('data', (data) => {
        this.logger.log(`웹 백엔드가 데이터 받는다: ${data}`);
        // 프론트로 다시 보내기
        this.handleTcpData(data);
      });

      socket.on('end', () => {
        this.logger.log(
          `연결 종료: ${socket.remoteAddress}:${socket.remotePort}`,
        );
        this.connectedClient = null;
      });

      socket.on('error', (err) => {
        this.logger.error(`소켓 오류: ${err.message}`);
      });
    });

    server.listen(port, () => {
      this.logger.log(`TCP 서버 포트 ${port}`);
    });
  }

  handleTcpData(data: any): void {
    const jsonData = data.toString('utf-8');
    if (this.wss) {
      // this.tcpDataGetData(jsonData);
      // ai tcp 로 던지기
      this.sendDataToOtherTcpServer('localhost', 11235, jsonData);
    } else {
      this.logger.error('WebSocketService가 초기화되지 않았습니다.');
    }
  }

  sendDataToOtherTcpServer(
    newAddress: string,
    newPort: number,
    data: any,
  ): void {
    const client = new net.Socket();
    client.connect(newPort, newAddress, () => {
      // console.log(`다른 TCP 서버로 데이터 전송: ${data}`);
      client.write(data);
    });

    client.on('data', (receivedData) => {
      // ai tcp 로그에 출력
      this.logger.log(`ai tcp 데이터 수신: ${receivedData}`);
      // 웹소켓으로 프론트에다가 던지기
      this.sendDataToWebSocketClients(receivedData);
    });

    client.on('close', () => {
      console.log('다른 TCP 서버와의 연결 종료');
    });

    client.on('error', (err) => {
      console.error(`다른 TCP 서버 연결 오류: ${err.message}`);
    });
  }

  webSocketGetData(message: any): void {
    this.sendDataToEmbeddedServer(message);

    if (!this.connectedClient || this.connectedClient.destroyed) {
      this.setupTcpClient('localhost', 11237, message);
    }
  }

  sendDataToWebSocketClients(data: any) {
    if (!this.wss) {
      console.log('없다는데..?');
    }

    if (this.wss) {
      this.logger.log('프론트로 다시 보내기');
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

  setupTcpClient(newAddress: string, newPort: number, data: any): void {
    if (!this.connectedClient || this.connectedClient.destroyed) {
      const newClient = new net.Socket();
      newClient.connect(newPort, newAddress, () => {
        this.connectedClient = newClient;
        this.sendDataToEmbeddedServer(data);
      });

      newClient.on('data', (data) => {
        this.logger.log(`업데이트된 클라이언트로부터 데이터 수신: ${data}`);
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
