/// <reference types="node" />
import * as net from 'net';
import { Server, Socket } from 'socket.io';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { LoggerService } from '../logger.service';
import { RuningInfoService } from '../runingInfo/runingInfo.service';
export declare class CombinedService implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger;
    private readonly runingInfoService;
    wss: Server;
    connectedClient: net.Socket | null;
    count: number;
    reqArr: any;
    prevReqDttm: string | null;
    clients: Socket[];
    constructor(logger: LoggerService, runingInfoService: RuningInfoService);
    updatePrevReqDttm(reqDttm: string): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): Promise<void>;
    broadcastDisconnectedClient(): Promise<void>;
    extractIPAddress(inputString: string | string[]): string | null;
    handleConnection(client: Socket): void;
    webSocketGetData(message: any): void;
    sendDataToWebSocketClients(data: any): void;
    sendDataToEmbeddedServer(data: any): void;
    stopTcpServer(): void;
    setupTcpClient(newAddress: string, newPort: number): void;
}
