// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisModule.forRoot({
      type: 'single', // Redis의 단일 서버 유형을 명시합니다
      url: 'redis://localhost:6379', // Redis 연결 URL
    } as RedisModuleOptions),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
