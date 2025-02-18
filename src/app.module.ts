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
import { LisCodeWbcModule } from './settings/report/lisCode/wbc/lisCodeWbc.module';
import { LisCodeRbcModule } from './settings/report/lisCode/rbc/lisCodeRbc.module';
import { CbcCodeModule } from './settings/report/cbcCode/cbcCode.module';
import { FilePathSetModule } from './settings/report/filrPathSet/filePathSetModule';
import { WbcRunCountModule } from './settings/report/runInfoCount/wbcRunCount.module';
import { JsonReaderModule } from './jsonReader/jsonReader.module';
import { MinCountModule } from './settings/report/minCount/minCount.module';
import { RuningInfoModule } from './runingInfo/runingInfo.module';
import { ImagesController } from './images/images.controller';
import { ExcelService } from './excel/excel.service';
import { ExcelController } from './excel/excel.controller';

import { HttpExceptionFilter } from './utils/http-exception.filter';
import { ResponseInterceptor } from './utils/response.interceptor';
import { CombinedModule } from './combinedProtocol/combined.module';
import { LoggerService } from './logger.service';
import { FolderController } from './drivesFolder/drivesFolderController';
import { FoldersController } from './images/folders.controller';
import { PdfController } from './pdfDown/pdf.controller';
import { FileSystemController } from './fileSys/file-system.controller';
import { FileSystemService } from './fileSys/file-system.service';
import { IpModule } from './ipService/ipService.module';
import { ClassOrderModule } from './classOrder/classOrder.module';
// import { CacheInterceptor } from './interceptors/cache-control.interceptor';
import { DziReaderModule } from './dziReader/dziReader.module';
import { FileModule } from './file/file.module';
import { ImagesService } from './images/images.service';
import { Hl7Module } from './hl7/hl7.module';
import { DeviceModule } from './device/device.module';
import { DownloadModule } from './download/download.module';
import { RemainingCountController } from './settings/analysisDatabse/deviceController/remaining-count.controller';
import { RemainingCountService } from './settings/analysisDatabse/deviceController/remaining-count.service';
import { QualityCheckService } from './settings/qualityCheck/qualityCheck.service';
import { QualityCheckController } from './settings/qualityCheck/qualityCheck.controller';
import { BrowserModule } from './browserExit/browser.module';
import { UploadModule } from './upload/upload.module';
import { CbcModule } from './lisMakeData/cbc.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CrcModule } from './settings/report/crc/crc.module';
import { HttpModule } from '@nestjs/axios';
import { RTFModule } from './rtf/rtf.module';
import { SybaseController } from './sybase/sybase.controller';
import { SybaseProxyService } from './sybase/sybase.proxy.service';
import { OracleController } from './oracle/oracle.controller';
import { OracleProxyService } from './oracle/oracle.proxy.service';
import GraphQLJSON from 'graphql-type-json';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: createTypeOrmOptions,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: 'src/schema.gql',
      playground: true, // 개발용 그래프QL 플레이그라운드 활성화
      path: 'api/graphql', // 엔드포인트 경로 지정
      resolvers: { JSON: GraphQLJSON }, // JSON 타입 추가
    }),
    RedisModule.forRoot({
      type: 'single', // Redis의 단일 서버 유형을 명시합니다
      url: 'redis://localhost:6379', // 윈도우 기준 Redis 연결 URL
      // host: 'redis', // Docker에서 Redis 서비스 이름
      // port: 6379, // Redis 기본 포트
    } as RedisModuleOptions),
    HttpModule,
    UserModule,
    CellImgAnalyzedModule,
    RbcDegreeModule,
    WbcCustomClassModule,
    WbcHotKeysModule,
    NormalRangeModule,
    BfHotKeysModule,
    ImagePrintModule,
    LisCodeWbcModule,
    LisCodeRbcModule,
    CbcCodeModule,
    FilePathSetModule,
    WbcRunCountModule,
    JsonReaderModule,
    MinCountModule,
    RuningInfoModule,
    CombinedModule,
    IpModule,
    ClassOrderModule,
    DziReaderModule,
    FileModule,
    Hl7Module,
    DeviceModule,
    DownloadModule,
    BrowserModule,
    UploadModule,
    CbcModule,
    CrcModule,
    RTFModule,
  ],
  controllers: [
    AppController,
    FolderController,
    ImagesController,
    FoldersController,
    PdfController,
    FileSystemController,
    RemainingCountController,
    QualityCheckController,
    ExcelController,
    SybaseController,
    OracleController,
  ],
  providers: [
    LoggerService,
    AppService,
    FileSystemService,
    ImagesService,
    RemainingCountService,
    QualityCheckService,
    ExcelService,
    SybaseProxyService,
    OracleProxyService,
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
