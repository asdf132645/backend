//tcpServer.service.ts

import { Inject, Injectable, Logger } from "@nestjs/common";
import * as net from 'net';
import { Communication } from './interface/communication.interface';
import { CommunicationService } from './communication.service';
import { Server } from "socket.io"; // CommunicationService 가져오기
import { CACHE_MANAGER } from '@nestjs/cache-manager'; // Import CACHE_MANAGER
import { Cache } from 'cache-manager';

@Injectable()
export class TcpServerService implements Communication {
  connectedClient: net.Socket | null = null;
  communicationService: CommunicationService | undefined;
  serverInstance: Server; // 서버 인스턴스 캐시

  public serverInstanceGetter(): Server | null {
    return this.serverInstance;
  }

  constructor(
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // Inject the CacheManager

  ) {}


  // 중간다리 이용
  setCommunicationService(comse: CommunicationService) {
    this.communicationService = comse;
  }



  start(port: number): void {
    const server = new net.Server();

    this.setCommunicationService(new CommunicationService(this.logger, this.cacheManager)); // CommunicationService 초기화 추가

    server.on('connection', (socket) => {
      if (this.connectedClient) {
        this.connectedClient.destroy();
      }
      this.connectedClient = socket;
      this.logger.log(
        `New connection from ${socket.remoteAddress}:${socket.remotePort}`,
      );

      socket.on('data', (data) => {
        this.logger.log(`Received data: ${data}`);
        this.handleTcpData(data);
        console.log('데이터를 받아온다.')
      });

      socket.on('end', () => {
        this.logger.log(
          `Connection from ${socket.remoteAddress}:${socket.remotePort} closed`,
        );
        this.connectedClient = null;
      });

      socket.on('error', (err) => {
        this.logger.error(`Socket error: ${err.message}`);
      });

    });

    server.listen(port, () => {
      this.logger.log(`tcp 서버 port ${port}`);
    });
  }

  stop(): void {
    if (this.connectedClient) {
      this.connectedClient.destroy();
    }
  }

  // tcp 받으면 웹소켓으로 전달 코드
  handleTcpData(data: any): void {
    const jsonData = data.toString('utf-8');
    if (this.communicationService) {
      this.communicationService.sendDataToWebSocketClients(jsonData, this.serverInstance);

    } else {
      this.logger.error('WebSocketService is not initialized.');
    }
  }

  // 다시 연결 하는 코드
  setupClient(newAddress: string, newPort: number, data: any): void {
    if (!this.connectedClient || this.connectedClient.destroyed) {
      const newClient = new net.Socket();
      // console.log('다시 살리기~');
      newClient.connect(newPort, newAddress, () => {
        // this.logger.log(`TCP client connected to ${newAddress}:${newPort}`);
        this.connectedClient = newClient;
        this.sendDataToEmbeddedServer(data);
      });

      newClient.on('data', (data) => {
        this.logger.log(`Received data from the updated client: ${data}`);
      });

      newClient.on('end', () => {
        this.logger.log('TCP client connection closed');
        this.connectedClient = null;
      });

      newClient.on('error', (err) => {
        this.logger.error(`TCP client error: ${err.message}`);
      });
    } else {
      this.logger.warn('Client connection already active.');
    }
  }


  websocketTransferTcp(data: any, wss: any): void {
    this.sendDataToEmbeddedServer(data, wss);
    this.sendWebSocketFe(data, wss)

    if (!this.connectedClient || this.connectedClient.destroyed) {
      this.setupClient('localhost', 11235, data);
    }
  }

  async sendWebSocketFe(data: any, wss?: any): Promise<void> {
      // console.log(wss)
  }

  sendDataToEmbeddedServer(data: any, wss?: any): void {

    if (this.connectedClient && !this.connectedClient.destroyed) {
      try {
        const serializedData = JSON.stringify(data);
        this.connectedClient.write(serializedData);
      } catch (error) {
        this.logger.error(`Error serializing data: ${error.message}`);
      }
    } else {
      this.logger.warn('No active TCP client connection. Data not sent.');
    }
  }
}
