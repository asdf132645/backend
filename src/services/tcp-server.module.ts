// tcp-server.module.ts
import { Module } from '@nestjs/common';
import { TcpServerService } from './tcp-server.service';
import { Logger } from '@nestjs/common'; // Import Logger directly

@Module({
  providers: [TcpServerService, Logger], // Include Logger directly in the providers array
  exports: [TcpServerService, Logger],
})
export class TcpServerModule {}
