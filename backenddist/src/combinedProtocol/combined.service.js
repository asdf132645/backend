"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombinedService = void 0;
const common_1 = require("@nestjs/common");
const net = require("net");
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
const logger_service_1 = require("../logger.service");
const dotenv = require("dotenv");
const runingInfo_service_1 = require("../runingInfo/runingInfo.service");
dotenv.config();
let CombinedService = class CombinedService {
    constructor(logger, runingInfoService) {
        this.logger = logger;
        this.runingInfoService = runingInfoService;
        this.connectedClient = null;
        this.count = 0;
        this.reqArr = [];
        this.prevReqDttm = null;
        this.clients = [];
    }
    updatePrevReqDttm(reqDttm) {
        this.prevReqDttm = reqDttm;
    }
    afterInit(server) {
        this.wss = server;
    }
    async handleDisconnect(client) {
        const clientIpAddress = client.handshake.headers['x-real-ip'] || client.conn.remoteAddress;
        const ipAddress = this.extractIPAddress(clientIpAddress);
        if (ipAddress) {
            await this.runingInfoService.clearPcIpAndSetStateFalse(ipAddress);
        }
        if (process.env.MAIN_API === ipAddress) {
            this.logger.log(`clientExit 누름`);
            this.webSocketGetData({
                type: 'SEND_DATA',
                payload: {
                    jobCmd: 'clientExit',
                    reqUserId: '',
                    reqDttm: '',
                },
            });
        }
        const clientIndex = this.clients.findIndex((c) => c.id === client.id);
        if (clientIndex !== -1) {
            await this.broadcastDisconnectedClient();
            this.clients.splice(clientIndex, 1);
        }
    }
    async broadcastDisconnectedClient() {
        this.clients.forEach((client) => {
            client.emit('stateVal', '');
        });
    }
    extractIPAddress(inputString) {
        if (Array.isArray(inputString)) {
            return null;
        }
        const ipAddressRegex = /\d+\.\d+\.\d+\.\d+/;
        const ipAddressMatch = inputString.match(ipAddressRegex);
        return ipAddressMatch ? ipAddressMatch[0] : null;
    }
    handleConnection(client) {
        const clientIpAddress = client.handshake.headers['x-real-ip'] || client.conn.remoteAddress;
        const ipAddress = this.extractIPAddress(clientIpAddress);
        this.clients.push(client);
        this.logger.log(`WebSocket 클라이언트 연결됨: ${client.conn}`);
        client.on('message', (message) => {
            try {
                if (this.wss) {
                    if (ipAddress === process.env.MAIN_API) {
                        console.log(ipAddress);
                        this.logger.log(`정상 수신 데이터 ${JSON.stringify(message)}`);
                        this.webSocketGetData(message);
                    }
                }
            }
            catch (e) {
                this.logger.error(`WebSocket 메시지 처리 중 오류 발생: ${e.message}`);
            }
        });
        client.on('state', (state) => {
            try {
                if (this.wss) {
                    this.wss.emit('stateVal', state);
                }
            }
            catch (e) {
                this.logger.error(`WebSocket 메시지 처리 중 오류 발생: ${e.message}`);
            }
        });
        client.on('viewerCheck', () => {
            try {
                if (this.wss) {
                    if (process.env.MAIN_API === ipAddress) {
                        this.wss.emit('viewerCheck', ipAddress);
                    }
                }
            }
            catch (e) {
                this.logger.error(`WebSocket 메시지 처리 중 오류 발생: ${e.message}`);
            }
        });
        client.on('disconnect', (reason) => {
            this.logger.log(`클라이언트가 닫힘: ${client.id}, Reason: ${reason}`);
        });
        client.conn.on('close', (code) => {
            this.logger.log(`1000번을 제외한 code는 비정상 종료: ${client.id}, Code: ${code}`);
            if (code === 1000) {
                this.logger.log('Normal closure');
            }
            else if (code === 1006) {
                this.logger.log('Abnormal closure');
            }
            else {
                this.logger.log(`Closure with code: ${code}`);
            }
        });
        client.on('error', (error) => {
            this.logger.error(`WebSocket 클라이언트 오류: ${error.message}`);
        });
    }
    webSocketGetData(message) {
        this.sendDataToEmbeddedServer(message);
        if (!this.connectedClient || this.connectedClient.destroyed) {
            this.setupTcpClient('localhost', 11235);
        }
    }
    sendDataToWebSocketClients(data) {
        if (!this.wss) {
            console.log('없다는데..?');
        }
        if (this.wss) {
            let jsonData = '';
            if (data?.err) {
                jsonData = `{ "bufferData": 'err' }`;
            }
            else {
                jsonData = data;
            }
            this.wss.emit('chat', jsonData);
        }
        else {
            this.logger.warn('웹소켓 전송 실패..');
        }
    }
    sendDataToEmbeddedServer(data) {
        if (this.connectedClient && !this.connectedClient.destroyed) {
            try {
                const seData = [data.payload];
                for (const seDataKey in seData) {
                    const serializedData = JSON.stringify(seData[seDataKey]);
                    this.connectedClient.write(serializedData);
                }
            }
            catch (error) {
                this.logger.error(`데이터 직렬화 오류: ${error.message}`);
            }
        }
        else {
            this.logger.warn('활성화된 TCP 클라이언트 연결 없음. 데이터 전송되지 않았습니다.???');
        }
    }
    stopTcpServer() {
        if (this.connectedClient) {
            this.connectedClient.destroy();
        }
    }
    setupTcpClient(newAddress, newPort) {
        if (!this.connectedClient || this.connectedClient.destroyed) {
            const newClient = new net.Socket();
            newClient.connect(newPort, newAddress, () => {
                this.connectedClient = newClient;
            });
            const partialData = [];
            newClient.on('data', (chunk) => {
                partialData.push(chunk);
                if (this.wss) {
                    this.sendDataToWebSocketClients(chunk);
                }
                else {
                    this.logger.error('WebSocketService가 초기화되지 않았습니다.');
                }
            });
            newClient.on('end', () => {
                this.logger.log('TCP 클라이언트 연결 종료');
                this.sendDataToWebSocketClients({ err: true });
                this.connectedClient = null;
            });
            newClient.on('error', (err) => {
                this.logger.error(`TCP 클라이언트 오류: ${err.message}`);
                this.sendDataToWebSocketClients({ err: true });
            });
        }
        else {
            this.logger.warn('이미 클라이언트 연결이 활성화되어 있습니다.');
        }
    }
};
exports.CombinedService = CombinedService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CombinedService.prototype, "wss", void 0);
exports.CombinedService = CombinedService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        transports: ['websocket'],
        cors: { origin: '*', allowedHeaders: '*' },
    }),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        runingInfo_service_1.RuningInfoService])
], CombinedService);
//# sourceMappingURL=combined.service.js.map