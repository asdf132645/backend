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
import { isServerRunningLocally } from '../utils/network';

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
  public notRes: boolean = false;
  private serverIp: any; // 서버의 IP 주소 저장
  private reconnectAttempts: number = 0; // 재연결 시도 횟수
  private maxReconnectAttempts: number = 10; // 최대 재연결 시도 횟수
  private reconnectDelay: number = 5000; // 재연결 시도 지연 (밀리초 단위)
  private mainPc: boolean = true;

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

  // ai tcp 연결 끊길경우 동작 코드
  async handleDisconnect(client: Socket) {
    const clientIpAddress =
      client.handshake.headers['x-real-ip'] || client.conn.remoteAddress;

    const ipAddress = this.extractIPAddress(clientIpAddress);
    // PC IP 확인 후 처리
    if (ipAddress) {
      await this.runingInfoService.clearPcIpAndSetStateFalse(ipAddress);
    }
    this.logger.log(`WebSocket 클라이언트 정보: ${client.conn}`);
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
  async handleConnection(client: Socket) {
    const clientIpAddress =
      client.handshake.headers['x-real-ip'] || client.conn.remoteAddress;
    const ipAddress = this.extractIPAddress(clientIpAddress);
    this.clients.push(client);
    this.logger.log(`WebSocket 클라이언트 연결됨: ${client.conn}`);

    this.serverIp = await isServerRunningLocally();
    this.wss.emit('multiViewer', client.conn.remoteAddress);

    // 클라이언트의 Origin 헤더 가져오기
    client.on('message', (message) => {
      try {
        if (this.wss) {
          delete message.payload?.anyWay;
          if (!client.conn.remoteAddress.includes('192.168.0.131')) {
            this.logger.log(
              `웹소켓 프론트에서 받은 데이터 ${JSON.stringify(message.payload)}`,
            );
          }
          if (!this.notRes) {
            this.webSocketGetData(message);
          }
          // }
        }
      } catch (e) {
        this.logger.error(
          `🚨 WebSocket 프론트 메시지 처리 중 오류 발생: ${e.message}`,
        );
      }
    });

    client.on('state', (state: any) => {
      // console.log('state');
      try {
        if (this.wss) {
          console.log('state', state);
          this.wss.emit('stateVal', state);
        }
      } catch (e) {
        this.logger.error(
          `🚨 WebSocket 프론트 메시지 처리 중 오류 발생: ${e.message}`,
        );
      }
    });

    client.on('viewerCheck', () => {
      try {
        if (this.wss) {
          // if (clientIpAddress.includes('127.0.0.1')) {
          this.wss.emit('viewerCheck', ipAddress);
          // }
        }
      } catch (e) {
        this.logger.error(
          `🚨 WebSocket 프론트(viewerCheck) 메시지 처리 중 오류 발생: ${e.message}`,
        );
      }
    });

    client.on('disconnect', async () => {
      this.logger.log('WebSocket 클라이언트 연결 끊김');
    });

    client.on('error', (error) => {
      this.logger.error(`🚨 WebSocket 클라이언트 오류: ${error.message}`);
    });
  }

  webSocketGetData(message: any): void {
    this.sendDataToEmbeddedServer(message);

    if (!this.connectedClient || this.connectedClient.destroyed) {
      this.setupTcpServer('localhost', 11235);
    }
  }

  sendDataToWebSocketClients(data: any) {
    if (!this.wss) {
      console.log('없다는데..?');
      this.logger.error(
        `🚨 WebSocket 서버 연결 끊김 클라이언트 서버 확인 필요`,
      );
    }

    if (this.wss) {
      let jsonData = '';
      if (data?.err) {
        jsonData = `{ "bufferData": 'err' }`;
      } else {
        jsonData = data;
      }
      this.wss.emit('chat', jsonData);

      this.logger.log(
        `코어 데이터 -> 웹 백엔드 -> 프론트엔드로 전송 ${jsonData}`,
      );
      this.notRes = false;
    } else {
      this.logger.error('🚨 웹소켓 전송 실패..');
    }
  }

  sendDataToEmbeddedServer(data: any): void {
    if (this.connectedClient && !this.connectedClient.destroyed) {
      try {
        const serializedData = JSON.stringify(data.payload);

        // 데이터 전송 속도 조절을 위한 지연 추가
        const throttleDelay = 100; // 100ms 지연

        setTimeout(() => {
          if (!serializedData) {
            return;
          }
          this.connectedClient.write(serializedData);
          // this.logger.log(`웹백엔드 -> 코어로 전송: ${serializedData}`);
        }, throttleDelay);

        // 연결 상태에 따라 `notRes` 플래그 설정
        const validCommands = [
          'INIT',
          'RBC_RE_CLASSIFICATION',
          'START',
          'STOP',
          'RUNNING_COMP',
          'PAUSE',
          'RESTART',
          'RECOVERY',
        ];

        if (validCommands.includes(data.payload.jobCmd)) {
          this.notRes = false;
        }
      } catch (error) {
        this.logger.error(`🚨 데이터 직렬화 오류: ${error.message}`);
      }
    } else {
      this.notRes = false;
      this.logger.warn(
        '⚠️ 활성화된 코어 TCP 없음. 데이터 전송 안됨 코어 tcp 연결 확인 필요.',
      );
    }
  }

  stopTcpServer(): void {
    if (this.connectedClient) {
      this.connectedClient.destroy();
    }
  }

  setupTcpServer(newAddress: string, newPort: number): void {
    const connectClient = () => {
      if (!this.connectedClient || this.connectedClient.destroyed) {
        const newClient = new net.Socket();

        newClient.setTimeout(10000); // 10초 타임아웃

        newClient.connect(newPort, newAddress, () => {
          this.logger.log('코어 TCP 웹 백엔드 연결 성공');
          this.connectedClient = newClient;
          this.wss.emit('isTcpConnected', true);
          this.reconnectAttempts = 0; // 재연결 시도 횟수 초기화
        });

        newClient.on('timeout', () => {
          this.logger.error('🚨 코어 TCP 웹 백엔드 연결 타임아웃');
          this.handleReconnectFailure(newClient);
        });

        newClient.on('data', (chunk) => {
          if (this.wss) {
            this.sendDataToWebSocketClients(chunk);
            this.notRes = false;
          } else {
            this.logger.error('🚨 WebSocketService가 초기화되지 않았습니다.');
          }
        });

        newClient.on('end', () => {
          this.logger.log('코어 TCP 클라이언트 연결 종료');
          this.sendDataToWebSocketClients({ err: true });
          this.handleReconnectFailure(newClient);
        });

        newClient.on('error', (err: any) => {
          this.logger.error(
            `🚨[${err.code}] 코어 TCP 연결 오류: ${err.syscall} ${err.address} ${err.port}`,
          );
          this.sendDataToWebSocketClients({ err: true });
          this.handleReconnectFailure(newClient);
        });
      } else {
        this.logger.warn(
          '⚠️ 이미 클라이언트 연결이 활성화되어 있습니다. 연결 재활성화 시 문제 없음 정상 코드',
        );
      }
    };

    connectClient();
  }

  private handleReconnectFailure(client: net.Socket) {
    if (!this.mainPc) {
      return;
    }
    this.reconnectAttempts++;
    client.destroy(); // 기존 소켓 종료
    this.connectedClient = null;

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.logger.warn(
        `⚠️ 재연결 시도 ${this.reconnectAttempts}/${this.maxReconnectAttempts}`,
      );
      setTimeout(
        () => this.setupTcpServer('localhost', 11235),
        this.reconnectDelay,
      );
    } else {
      this.logger.error('🚨 최대 재연결 시도 횟수 초과.');
    }
  }
}
