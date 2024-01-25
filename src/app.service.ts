import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    // this.tcpClientService.setupClient('localhost', 11236);

    return 'Hello World!';
  }
}
