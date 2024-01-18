// tcp-server.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class TcpServerService {
  private server: net.Server;

  constructor(private readonly logger: Logger) {
    this.server = new net.Server();
  }

  start(port: number) {
    this.server.listen(port, () => {
      this.logger.log(`TCP server is listening on port ${port}`);
    });

    this.server.on('connection', (socket) => {
      this.logger.log(
        `New connection from ${socket.remoteAddress}:${socket.remotePort}`,
      );

      socket.on('data', (data) => {
        this.logger.log(`Received data: ${data}`);
        // Implement your logic for handling received data
      });

      socket.on('end', () => {
        this.logger.log(
          `Connection from ${socket.remoteAddress}:${socket.remotePort} closed`,
        );
      });

      socket.on('error', (err) => {
        this.logger.error(`Socket error: ${err.message}`);
      });
    });

    this.server.on('close', () => {
      this.logger.log('TCP server closed');
    });

    this.server.on('error', (err) => {
      this.logger.error(`TCP server error: ${err.message}`);
    });
  }

  stop() {
    this.server.close();
  }
}
