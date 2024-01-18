import { Module, Logger } from '@nestjs/common';
import { TcpClientService } from './tcp-client.service';

@Module({
  providers: [TcpClientService, Logger],
  exports: [TcpClientService],
})
export class TcpClientModule {}
