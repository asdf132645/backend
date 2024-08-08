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

    // if (clientIpAddress.includes('127.0.0.1')) {
    this.logger.log(`clientExit 누름`);
    this.webSocketGetData({
      type: 'SEND_DATA',
      payload: {
        jobCmd: 'clientExit',
        reqUserId: '',
        reqDttm: '',
      },
    });
    // }
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
  extractIPv4Address(remoteAddress: string): string | null {
    // IPv6-mapped IPv4 주소에서 IPv4 주소를 추출하기 위한 정규 표현식
    const ipv4Regex = /::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;

    // 정규 표현식으로 주소를 검색
    const matches = remoteAddress.match(ipv4Regex);

    // IPv4 주소가 발견되면 반환, 그렇지 않으면 null 반환
    return matches ? matches[1] : null;
  }

  // 웹소켓 통신
  async handleConnection(client: Socket) {
    const clientIpAddress =
      client.handshake.headers['x-real-ip'] || client.conn.remoteAddress;
    const ipAddress = this.extractIPAddress(clientIpAddress);
    this.clients.push(client);
    this.logger.log(`WebSocket 클라이언트 연결됨: ${client.conn}`);
    const ipv4Address = this.extractIPv4Address(client.conn.remoteAddress);
    // console.log(ipv4Address);

    this.serverIp = await isServerRunningLocally(ipv4Address);
    this.logger.log(`Server IP address: ${this.serverIp}`);
    // 클라이언트의 Origin 헤더 가져오기
    // const clientOrigin = client.handshake.headers['origin'];
    client.on('message', (message) => {
      try {
        if (this.wss) {
          // if (clientOrigin.includes('127.0.0.1') || message.payload?.anyWay) {
          delete message.payload?.anyWay;
          this.logger.log(
            `정상 수신 데이터 ${JSON.stringify(message.payload)}`,
          );
          if (!this.notRes) {
            this.webSocketGetData(message);
          }
          // }
        }
      } catch (e) {
        this.logger.error(`WebSocket 메시지 처리 중 오류 발생: ${e.message}`);
      }
    });

    client.on('state', (state: any) => {
      // console.log('state');
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
          // if (clientIpAddress.includes('127.0.0.1')) {
          this.wss.emit('viewerCheck', ipAddress);
          // }
        }
      } catch (e) {
        this.logger.error(`WebSocket 메시지 처리 중 오류 발생: ${e.message}`);
      }
    });

    client.on('disconnect', async () => {
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
      this.logger.log(`프론트엔드로 전송 ${jsonData}`);
      this.notRes = false;
    } else {
      this.logger.error('웹소켓 전송 실패..');
    }
  }

  sendDataToEmbeddedServer(data: any): void {
    if (this.connectedClient && !this.connectedClient.destroyed) {
      try {
        const seData = [data.payload];
        for (const seDataKey in seData) {
          const serializedData = JSON.stringify(seData[seDataKey]);
          if (data.payload.jobCmd !== 'INIT') {
            this.notRes = true;
          }
          this.connectedClient.write(serializedData);
          this.logger.log(`tcp로 전송 ${serializedData}`);
        }
      } catch (error) {
        this.logger.error(`데이터 직렬화 오류: ${error.message}`);
      }
    } else {
      this.notRes = false;
      this.logger.warn(
        '활성화된 TCP 클라이언트 연결 없음. 데이터 전송 안됨 tcp 연결 확인 필요.',
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
      });

      const partialData: Buffer[] = []; // 부분적인 데이터를 저장할 배열

      newClient.on('data', (chunk) => {
        partialData.push(chunk);

        if (this.wss) {
          this.sendDataToWebSocketClients(chunk);
          this.sendDataToWebSocketClients('tcpConnected');
          this.notRes = false;
          console.log('TCP 연결 됐음');
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
