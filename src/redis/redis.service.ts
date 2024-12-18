import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { spawn } from 'child_process';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: Redis;

    constructor() {
        this.connectToRedis();
    }

    private connectToRedis() {
        this.client = new Redis({
            host: '127.0.0.1',
            port: 6379,
            retryStrategy: (times) => {
                console.error(`Redis 연결 재시도 중... (${times})`);
                return Math.min(times * 100, 3000); // 재시도 간격 (최대 3초)
            },
        });

        this.client.on('connect', () => {
            console.log('Redis 서버에 성공적으로 연결되었습니다.');
        });

        this.client.on('error', (error) => {
            console.error('Redis 연결 오류:', error.message);
            this.restartRedisServer();
        });
    }

    private restartRedisServer() {
        console.log('Redis 서버 재시작 중...');
        // Windows 기준 Redis 서버 실행 명령어 (경로는 환경에 따라 수정 필요)
        const redisProcess = spawn('cmd', ['/c', 'C:\\Program Files\\Redis\\redis-server.exe']);

        redisProcess.stdout.on('data', (data) => {
            console.log(`Redis 재시작 로그: ${data}`);
        });

        redisProcess.stderr.on('data', (data) => {
            console.error(`Redis 재시작 오류: ${data}`);
        });

        redisProcess.on('close', (code) => {
            console.log(`Redis 서버 종료 코드: ${code}`);
            // 재연결 시도
            this.connectToRedis();
        });
    }

    getClient(): Redis {
        return this.client;
    }

    async onModuleInit() {
        console.log('RedisService 초기화');
    }

    async onModuleDestroy() {
        console.log('RedisService 종료 중...');
        this.client.disconnect();
    }
}
