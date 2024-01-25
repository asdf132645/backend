// app.module.ts
import { Module, Logger, HttpStatus, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmOptions } from '../ormconfig';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { ProInfoModule } from './processinfo/proInfo.module';
import { ResponseInterceptor } from './utils/response.interceptor';
// import { ProtocolModule } from './protocol/protocol.module';
import { CombinedModule} from './combinedProtocol/combined.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: createTypeOrmOptions,
    }),
    UserModule,
    ProInfoModule,
    // ProtocolModule
    CombinedModule,
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
  ],
})
export class AppModule {}
