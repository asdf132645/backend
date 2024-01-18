import { Injectable, Logger } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class TcpClientService {
  private client: net.Socket | null = null;
  private bufList: Buffer[] = [];

  constructor(private readonly logger: Logger) {}

  setupClient(addr: string, port: number) {
    this.logger.log(`--setup client-- addr: ${addr}, port: ${port}`);

    if (this.client && !this.client.destroyed) {
      this.client.destroy();
    }

    this.client = new net.Socket();
    this.client.on('data', (chunk) => this.onReceiveData(chunk));
    this.client.on('error', (error) =>
      this.logger.error(`Socket error: ${error}`),
    );

    if (!this.client.connecting) {
      this.client.connect(port, addr);
    }
  }

  sendToServer(message: string) {
    this.logger.log(`send to server: ${message}`);

    if (!this.client || this.client.destroyed) {
      this.setupClient('localhost', 11236); // Adjust the default values if needed
    }

    const requestData = Buffer.from(message, 'utf-8');
    this.client.write(requestData);
  }

  private onReceiveData(buffer: Buffer) {
    try {
      this.bufList.push(buffer);

      // 여기서 바로 문자열로 변환해주는 코드를 추가합니다.
      const receivedMessage = Buffer.concat(this.bufList).toString('utf-8');

      // Implement your logic for handling received data
      this.logger.log('Received data:', receivedMessage);

      // 추가: 데이터를 처리한 후에 버퍼를 비웁니다.
      this.bufList = [];
    } catch (e) {
      this.logger.error(`Error onReceiveData: ${this.handleSocketError(e)}`);
    }
  }

  private handleSocketError(error: Error) {
    // 추가: 에러 메시지를 더 자세히 출력합니다.
    this.logger.error('Socket error:', error);

    // 추가: 에러가 AggregateError인 경우 개별 에러를 더 자세히 출력합니다.
    if (error instanceof AggregateError) {
      for (const subError of error.errors) {
        this.logger.error('SubError:', subError);
      }
    }
  }

}
