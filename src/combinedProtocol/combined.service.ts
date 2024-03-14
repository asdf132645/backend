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
import { Queue } from 'queue-typescript';

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
  private requestQueue: Queue<any>;

  constructor(private readonly logger: LoggerService) {
    this.requestQueue = new Queue();
  }

  afterInit(server: Server) {
    this.wss = server;
    // this.startTcpServer(11235);
    // this.setupTcpClient('localhost', 11235);
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
      this.requestQueue.enqueue(message); // TCP 연결이 없는 경우 큐에 요청 추가
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
        const serializedData = JSON.stringify(data.payload);
        this.connectedClient.write(serializedData, (error) => {
          if (error) {
            this.logger.error(`데이터 전송 중 오류 발생: ${error.message}`);
          } else {
            // 전송이 완료된 후 다음 데이터를 처리
            this.processNextQueueItem();
          }
        });
      } catch (error) {
        this.logger.error(`데이터 직렬화 오류: ${error.message}`);
      }
    } else {
      this.logger.warn(
        '활성화된 TCP 클라이언트 연결 없음. 데이터 전송 대기 중...',
      );

      // TCP 클라이언트가 비활성화된 경우 요청을 큐에 추가
      this.requestQueue?.enqueue(data);
    }
  }

  processNextQueueItem(): void {
    if (this.requestQueue?.length > 0) {
      const nextItem = this.requestQueue.dequeue();
      this.sendDataToEmbeddedServer(nextItem);
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

        // TCP 연결이 활성화된 경우 대기열의 모든 요청 처리
        while (this.requestQueue?.length > 0) {
          const request = this.requestQueue.dequeue();
          this.sendDataToEmbeddedServer(request);
        }
      });

      newClient.on('data', (data) => {
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
