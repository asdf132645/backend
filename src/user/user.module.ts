// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import { redisSettings } from '../cache/cache.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisModule.forRoot(redisSettings as RedisModuleOptions),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
