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

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: createTypeOrmOptions,
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: createLisTypeOrmOptions,
    // }),
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
  ],
  providers: [
    LoggerService,
    AppService,
    FileSystemService,
    ImagesService,
    RemainingCountService,
    QualityCheckService,
    ExcelService,
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
