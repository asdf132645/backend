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
import { BrowserService } from '../browserExit/browser.service';

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
  private reconnectDelay: number = 1000; // 재연결 시도 지연 (밀리초 단위)
  private mainPc: boolean = true;
  private isNotDownloadOrUploading = true;
  private tcpQueue: any[] = []; // 전송 대기열
  private isProcessing: boolean = false; // 현재 처리 중인지 여부

  constructor(
    private readonly logger: LoggerService,
    private readonly runingInfoService: RuningInfoService,
    private readonly browserService: BrowserService,
  ) {}

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
    await this.runingInfoService.addUniqueConstraintToSlotId();

    this.serverIp = await isServerRunningLocally();
    this.wss.emit('multiViewer', client.conn.remoteAddress);

    client.on('exit', () => {
      //
    });

    client.on('ping', () => {
      client.emit('pong');
      this.logger.ping(
        ` 프론트 Ping : 최초연결 한번 PING ${client.conn.remoteAddress}`,
      );
    });

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

          if (!['SYSINFO', 'RUNNING_INFO'].includes(message.payload.jobCmd)) {
            this.notRes = false;
          }

          if (!this.notRes) {
            this.webSocketGetData(message);
          }
        }
      } catch (e) {
        this.logger.error(
          `🚨 WebSocket 프론트 메시지 처리 중 오류 발생: ${e.message}`,
        );
      }
    });

    client.on('state', () => {
      // console.log('state');
      try {
        if (this.wss) {
          // console.log('state', state);
          this.wss.emit('stateVal', clientIpAddress);
        }
      } catch (e) {
        this.logger.error(
          `🚨 WebSocket 프론트 메시지 처리 중 오류 발생: ${e.message}`,
        );
      }
    });

    client.on(
      'isDownloadUploading',
      (state: { type: string; payload: boolean }) => {
        try {
          if (this.wss) {
            if (state.payload) {
              this.isNotDownloadOrUploading = false;
            } else {
              this.isNotDownloadOrUploading = true;
            }
          }
        } catch (e) {
          this.logger.logic(
            `[Download&Upload] 다운로드 or 업로드 도중 Core Backend로 통신 중지 실패: ${e}`,
          );
        }
      },
    );

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
      await this.runingInfoService.redisAllClear();
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

  async sendDataToEmbeddedServer(data: any): Promise<void> {
    // 데이터 중복 체크
    if (
      this.tcpQueue.some(
        (item) => JSON.stringify(item) === JSON.stringify(data),
      )
    ) {
      this.logger.warn('⚠️ 중복 데이터로 인해 전송이 무시되었습니다.');
      return;
    }

    // 데이터 큐에 추가
    this.tcpQueue.push(data);

    await this.processQueue(); // 큐 처리 시작
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || !this.tcpQueue.length) {
      return;
    }

    this.isProcessing = true; // 처리 중 상태로 설정
    const data = this.tcpQueue.shift(); // 큐에서 데이터 가져오기

    try {
      if (this.connectedClient && !this.connectedClient.destroyed) {
        const serializedData = JSON.stringify(data.payload);

        if (serializedData && this.isNotDownloadOrUploading) {
          this.connectedClient.write(serializedData);
          this.logger.log(`웹백엔드 -> 코어로 전송: ${serializedData}`);
          this.notRes = true;

          // 데이터 전송 후 일정 시간 대기 (예: 100ms)
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } else {
        this.logger.warn('⚠️ 활성화된 코어 TCP 없음. 데이터 전송 안됨.');
        this.notRes = false;
      }
    } catch (error) {
      this.logger.error(`🚨 TCP 데이터 전송 오류: ${error.message}`);
    } finally {
      this.isProcessing = false; // 처리 상태 해제
      await this.processQueue(); // 다음 큐 처리
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
        this.connectedClient = new net.Socket();

        this.connectedClient.setTimeout(10000); // 10초 동안 클라이언트 소켓이 데이터를 송수신하지 않으면 timeout 이벤트가 발생하도록 설정

        this.connectedClient.connect(newPort, newAddress, () => {
          this.logger.warn('코어 TCP 웹 백엔드 연결 성공');
          this.wss.emit('isTcpConnected', true);
          this.reconnectAttempts = 0; // 재연결 시도 횟수 초기화
          this.notRes = false;
        });

        this.connectedClient.on('timeout', () => {
          this.logger.error('🚨 코어 TCP 웹 백엔드 연결 타임아웃');
          this.handleReconnectFailure(this.connectedClient);
        });

        this.connectedClient.on('data', (chunk) => {
          this.logger.warn(`코어 TCP 서버로부터 데이터 수신 성공`); // 추가된 로깅
          if (this.wss) {
            this.sendDataToWebSocketClients(chunk);
            this.notRes = false;
          } else {
            this.logger.error('🚨 WebSocketService가 초기화되지 않았습니다.');
          }
        });

        this.connectedClient.on('end', () => {
          this.logger.warn('코어 TCP 클라이언트 연결 종료');
          this.sendDataToWebSocketClients({ err: true });
          this.handleReconnectFailure(this.connectedClient);
        });

        this.connectedClient.on('error', (err: any) => {
          this.logger.error(
            `🚨[${err.code} - 코어 서버 연결 거부] 코어 TCP 연결 오류 - ${err}`,
          );
          this.sendDataToWebSocketClients({ err: true });
          this.handleReconnectFailure(this.connectedClient);
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

    this.logger.warn(
      `⚠️ TCP 연결 실패, 재연결 시도 중 (${this.reconnectAttempts}/${this.maxReconnectAttempts})... 재 연결 텀 1초`,
    );

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(
        () => this.setupTcpServer('localhost', 11235),
        this.reconnectDelay,
      );
      // 연결 실패 후 즉시 재시도를 방지 - 끊기고 나서 바로 재연결 시도하면 여러가지 문제발생 할 수 있어서 바로 재시작 안함
      // 재연결 지연 시간을 두어, 자원 낭비를 줄이고 시스템을 안정화하려는 목적
    } else {
      this.logger.error('🚨 최대 재연결 시도 횟수 초과.');
    }
  }

  sendIsDownloadUploadFinished(type: 'upload' | 'download') {
    const obj = {
      type,
      isFinished: true,
    };
    this.wss.emit('downloadUploadFinished', obj);
  }
}
