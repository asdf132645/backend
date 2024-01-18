import { Injectable } from '@nestjs/common';
import { TcpClientService } from './services/tcp-client.service';

@Injectable()
export class AppService {
  constructor(private readonly tcpClientService: TcpClientService) {}

  getHello(): string {
    // this.tcpClientService.setupClient('localhost', 11236);

    return 'Hello World!';
  }
}
