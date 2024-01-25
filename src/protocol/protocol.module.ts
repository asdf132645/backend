// protocol.module.ts
import { Global, Module } from "@nestjs/common";
import { TcpServerService } from './tcpServer.service';
import { WebSocketService } from './webSocket.service';
import { Logger } from '@nestjs/common'; // Logger 추가
import { CommunicationModule } from './communication.module';

import { CacheModule } from '@nestjs/cache-manager';
@Global() // @Global 데코레이터 추가
@Module({
  imports: [
    CommunicationModule,
    CacheModule.register(), // Add CacheModule.register() here
  ],

  providers: [ WebSocketService,TcpServerService, Logger], // Logger 추가
  exports: [WebSocketService,TcpServerService, Logger], // Logger 추가
})
export class ProtocolModule {
  static forRoot() {
    // 여기서 필요한 초기화 작업 수행
    return {
      module: ProtocolModule,
    };
  }
}
