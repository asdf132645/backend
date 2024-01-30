// app.module.ts
import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmOptions } from '../ormconfig';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { ProInfoModule } from './processinfo/proInfo.module';
import { ResponseInterceptor } from './utils/response.interceptor';
import { CombinedModule } from './combinedProtocol/combined.module';
import { OrderListModule } from './orderList/orderList.module';
import { RBCModule } from './rbcclassification/rbc.module';
import { WBCModule } from './wbcclassification/wbc.module';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: createTypeOrmOptions,
    }),
    UserModule,
    OrderListModule,
    ProInfoModule,
    CombinedModule,
    RBCModule,
    WBCModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: winston,
      useFactory: () => {
        return winston.createLogger({
          transports: [
            new winston.transports.Console(), // 콘솔에 출력
            new DailyRotateFile({
              filename: 'logs/application-%DATE%.log',
              datePattern: 'YYYY-MM-DD',
              zippedArchive: true,
              maxSize: '20m',
              maxFiles: '2d', //2일뒤 삭제
            }),
          ],
        });
      },
    } as any,
  ],
})
export class AppModule {}
