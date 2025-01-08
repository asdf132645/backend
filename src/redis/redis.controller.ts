// import { Controller, Get} from '@nestjs/common';
// import Redis from 'ioredis';
// import {InjectRedis} from "@nestjs-modules/ioredis";
//
// @Controller('redis')
// export class HL7Controller {
//     constructor(@InjectRedis() private readonly redis: Redis) {}
//
//   @Get('ping')
//   async checkRedisServer(): Promise<any> {
//     // return this.hl7Service.parseHL7Message(data);
//   }
//
//   @Get('reconnect')
//   reconnectRedisServer() {
//         this.redis.connect()
//   }
// }
