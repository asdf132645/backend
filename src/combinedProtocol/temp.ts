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
import { RuningInfoService } from '../runingInfo/runingInfo.service';
// import { Readable } from 'stream';

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
  clients: Socket[] = [];

  constructor(
    private readonly logger: LoggerService,
    private readonly runingInfoService: RuningInfoService,
  ) {}

  // 이전 reqDttm 값을 갱신하는 함수
  updatePrevReqDttm(reqDttm: string) {
    this.prevReqDttm = reqDttm;
  }

  afterInit(server: Server) {
    this.wss = server;
  }

  async handleDisconnect(client: Socket) {
    const clientIpAddress =
      client.handshake.headers['x-real-ip'] || client.conn.remoteAddress;
    const ipAddress = this.extractIPAddress(clientIpAddress);
    // PC IP 확인 후 처리
    if (ipAddress) {
      await this.runingInfoService.clearPcIpAndSetStateFalse(ipAddress);
    }
    if (process.env.DB_HOST === ipAddress) {
      this.webSocketGetData({
        type: 'SEND_DATA',
        payload: {
          jobCmd: 'clientExit',
          reqUserId: '',
          reqDttm: '',
        },
      });
    }
    const clientIndex = this.clients.findIndex((c) => c.id === client.id);
    if (clientIndex !== -1) {
      await this.broadcastDisconnectedClient();
      this.clients.splice(clientIndex, 1);
    }
  }

  async broadcastDisconnectedClient() {
    this.clients.forEach((client) => {
      client.emit('stateVal', '');
    });
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
    this.clients.push(client);
    this.logger.log(`WebSocket 클라이언트 연결됨: ${client.conn}`);

    client.on('message', (message) => {
      try {
        if (this.wss) {
          // this.logger.log(message);
          if (ipAddress === process.env.DB_HOST) {
            this.webSocketGetData(message);
          }
        }
      } catch (e) {
        this.logger.error(`WebSocket 메시지 처리 중 오류 발생: ${e.message}`);
      }
    });

    client.on('state', (state: any) => {
      try {
        if (this.wss) {
          this.wss.emit('stateVal', state);
        }
      } catch (e) {
        this.logger.error(`WebSocket 메시지 처리 중 오류 발생: ${e.message}`);
      }
    });

    client.on('viewerCheck', () => {
      try {
        if (this.wss) {
          if (process.env.DB_HOST === ipAddress) {
            this.wss.emit('viewerCheck', ipAddress);
          }
        }
      } catch (e) {
        this.logger.error(`WebSocket 메시지 처리 중 오류 발생: ${e.message}`);
      }
    });

    client.on('disconnect', async () => {
      // if (!this.connectedClient || this.connectedClient.destroyed) {
      //   if (process.env.DB_HOST === ipAddress) {
      //     this.webSocketGetData({ jobCmd: 'clientExit' });
      //   }
      // }
      this.logger.log('WebSocket 클라이언트 연결 끊김');
    });

    client.on('error', (error) => {
      this.logger.error(`WebSocket 클라이언트 오류: ${error.message}`);
    });
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
        jsonData = `{ "bufferData": 'err' }`;
      } else {
        jsonData = data;
      }
      this.wss.emit('chat', jsonData);
    } else {
      this.logger.warn('웹소켓 전송 실패..');
    }
  }

  sendDataToEmbeddedServer(data: any): void {
    if (this.connectedClient && !this.connectedClient.destroyed) {
      try {
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

      const partialData: Buffer[] = []; // 부분적인 데이터를 저장할 배열

      newClient.on('data', (chunk) => {
        // console.log(chunk);
        partialData.push(chunk);

        // 데이터가 JSON 형식으로 완전히 전송되었는지 확인
        // let jsonData: string | null = null;
        // for (let i = 0; i < partialData.length; i++) {
        //   const buffer = partialData[i];
        //   if (buffer.toString().includes('}')) {
        //     jsonData = Buffer.concat(partialData).toString('utf-8');
        //     break;
        //   }
        // }

        // 완전한 JSON이 수신되었을 경우 처리
        // if (chunk !== null) {
        //   this.handleTcpData(chunk);
        //   partialData.length = 0; // 버퍼 초기화
        // }

        if (this.wss) {
          this.sendDataToWebSocketClients(chunk);
        } else {
          this.logger.error('WebSocketService가 초기화되지 않았습니다.');
        }
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
