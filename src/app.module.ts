import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmOptions } from '../ormconfig';
import { UserModule } from './user/user.module';
import { CellImgAnalyzedModule } from './settings/analysisDatabse/cellImgAnalyzed/cell.module';
import { RbcDegreeModule } from './settings/analysisDatabse/rbcDegree/rbcDegree.module';
import { WbcCustomClassModule } from './settings/analysisDatabse/wbcCustomClass/wbcCustomClass.module';
import { WbcHotKeysModule } from './settings/analysisDatabse/wbcHotKeys/wbcHotKeys.module';
import { NormalRangeModule } from './settings/analysisDatabse/normalRange/normalRange.module';
import { BfHotKeysModule } from './settings/analysisDatabse/bhHotKeys/bfHotKeys.module';
import { ImagePrintModule } from './settings/report/imagePrint/imagePrint.module';
import { LisCodeModule } from './settings/report/lisCode/wbc/lisCode.module';
import { LisCodeRbcModule } from './settings/report/lisCode/rbc/lisCodeRbc.module';
import { CbcCodeModule } from './settings/report/cbcCode/cbcCode.module';
import { FilePathSetModule } from './settings/report/filrPathSet/filePathSetModule';
import { WbcRunCountModule } from './settings/report/runInfoCount/wbcRunCount.module';
import { MinCountModule } from './settings/report/minCount/minCount.module';

import { HttpExceptionFilter } from './utils/http-exception.filter';
import { ResponseInterceptor } from './utils/response.interceptor';
import { CombinedModule } from './combinedProtocol/combined.module';
import { OrderListModule } from './orderList/orderList.module';
import { ProInfoModule } from './processinfo/proInfo.module';
import { RBCModule } from './rbcclassification/rbc.module';
import { WBCModule } from './wbcclassification/wbc.module';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: createTypeOrmOptions,
    }),
    UserModule,
    CellImgAnalyzedModule,
    RbcDegreeModule,
    WbcCustomClassModule,
    WbcHotKeysModule,
    NormalRangeModule,
    BfHotKeysModule,
    ImagePrintModule,
    LisCodeModule,
    LisCodeRbcModule,
    CbcCodeModule,
    FilePathSetModule,
    WbcRunCountModule,
    MinCountModule,
    OrderListModule,
    ProInfoModule,
    CombinedModule,
    RBCModule,
    WBCModule,
  ],
  controllers: [AppController],
  providers: [
    LoggerService,
    AppService,
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
