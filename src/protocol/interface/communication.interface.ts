// communication.interface.ts
import { Server, Socket } from 'socket.io';

export interface Communication {
  sendData?(data: any): void;
  handleData?(data: any): void;
  setWss?(wss: Server | null): void;
  handleTcpData?(data: any): void;
  handleWebSocketMessage?(message: any): void;
  start?(port: number): void;
  stop?(): void;
  setupClient?(newAddress: string, newPort: number, data?: any): void;
  setTcpService?(tcpService: Communication): void; // TCP 서비스를 설정하는 메서드 추가
  sendDataToWebSocketClients?(data: any, wss: any): void;
  websocketTransferTcp?(data: any, wss: any): void;
  isWssInitialized?(): any;
}
