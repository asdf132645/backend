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
          // console.log('message', message);
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
        // this.logger.log(`웹 백엔드가 데이터 받는다: ${data}`);
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
      const jsonArray = this.parseJsonArray(jsonData);
      if (Array.isArray(jsonArray)) {
        for (const item of jsonArray) {
          this.sendDataToOtherTcpServer('localhost', 11235, item)
            .then((receivedData) => {
              // sendDataToOtherTcpServer가 완료되면 실행될 코드
              this.logger.log(`ai tcp 데이터 수신: ${receivedData}`);
              this.sendDataToWebSocketClients(receivedData);
            })
            .catch((error) => {
              this.logger.error(
                `sendDataToOtherTcpServer 오류: ${error.message}`,
              );
            });
        }
      } else {
        this.sendDataToOtherTcpServer('localhost', 11235, jsonData)
          .then((receivedData) => {
            // sendDataToOtherTcpServer가 완료되면 실행될 코드
            this.logger.log(`ai tcp 데이터 수신: ${receivedData}`);
            this.sendDataToWebSocketClients(receivedData);
          })
          .catch((error) => {
            this.logger.error(
              `sendDataToOtherTcpServer 오류: ${error.message}`,
            );
          });
      }
    } else {
      this.logger.error('WebSocketService가 초기화되지 않았습니다.');
    }
  }

  parseJsonArray(data: any): any[] {
    let jsonArray: any[] = [];

    if (typeof data === 'string') {
      try {
        // 정상적인 JSON 배열로 파싱
        const parsedArray = data.split('}{').map((jsonString: string) => {
          const cleanedString = jsonString.replace(/^{|}$/g, ''); // 중괄호 제거
          return JSON.parse(`{${cleanedString}}`);
        });

        jsonArray = parsedArray;
      } catch (error) {
        this.logger.error(`parseJsonArray 데이터 파싱 오류: ${error.message}`);
        // JSON 파싱 실패 시 빈 배열 반환
        jsonArray = [];
      }
    }

    return jsonArray;
  }
  sendDataToOtherTcpServer(
    newAddress: string,
    newPort: number,
    data: any,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      client.connect(newPort, newAddress, () => {

        const jsonData = JSON.stringify(data);
        console.log('jsonData', jsonData);
        client.write(jsonData);
      });

      client.on('data', (receivedData) => {
        // sendDataToWebSocketClients를 호출하기 전에 먼저 Promise를 resolve
        // console.log(receivedData);
        resolve(receivedData);
      });

      client.on('close', () => {
        console.log('다른 TCP 서버와의 연결 종료');
      });

      client.on('error', (err) => {
        reject(err); // Promise를 reject하고 오류를 처리
      });
    });
  }

  webSocketGetData(message: any): void {
    this.sendDataToEmbeddedServer(message);

    if (!this.connectedClient || this.connectedClient.destroyed) {
      this.setupTcpClient('localhost', 11237);
    }
  }

  sendDataToWebSocketClients(data: any) {
    if (!this.wss) {
      console.log('없다는데..?');
    }

    if (this.wss) {
      this.logger.log('프론트로 다시 보내기');
      // console.log(data);
      const jsonData = JSON.stringify({ bufferData: data.toString() });
      this.wss.emit('chat', jsonData);
    } else {
      this.logger.warn('웹소켓 전송 실패..');
    }
  }

  sendDataToEmbeddedServer(data: any): void {
    // console.log(
    //   '웹소켓 데이터를 TCP 웹 백엔드에게 전달한다:',
    //   typeof data.payload,
    // );
    if (this.connectedClient && !this.connectedClient.destroyed) {
      try {
        const serializedData = JSON.stringify(data.payload);
        // console.log('serializedData', serializedData);
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
        // console.log('setupTcpClient');
        // this.sendDataToEmbeddedServer(data);
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
