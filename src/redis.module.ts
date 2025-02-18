import { Module, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Module({})
export class RedisModule implements OnModuleInit {
  private redisClient: Redis;

  onModuleInit() {
    const redisUrl = 'redis://redis:6379';
    this.redisClient = new Redis(redisUrl);

    this.redisClient.on('connect', () => {
      console.log('Redis connected successfully');
    });

    this.redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }
}
