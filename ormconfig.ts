import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './src/user/entities/user.entity';
import { CellImgAnalyzed } from './src/settings/analysisDatabse/cellImgAnalyzed/entities/cell.entity';
import { RbcDegree } from './src/settings/analysisDatabse/rbcDegree/rbcDegree.entity';
import { WbcCustomClass } from './src/settings/analysisDatabse/wbcCustomClass/wbcCustomClass.entity';
import { WbcHotKeys } from './src/settings/analysisDatabse/wbcHotKeys/wbcHotKeys.entity';
import { BfHotKeys } from './src/settings/analysisDatabse/bhHotKeys/bfHotKeys.entity';
import { NormalRange } from './src/settings/analysisDatabse/normalRange/normalRange.entity';
import { ImagePrintEntity } from './src/settings/report/imagePrint/imagePrint.entity';
import { LisCodeWbcEntity } from './src/settings/report/lisCode/wbc/lisCodeWbc.entity';
import { LisCodeRbcEntity } from './src/settings/report/lisCode/rbc/lisCodeRbc.entity';
import { CbcCodeEntity } from './src/settings/report/cbcCode/cbcCode.entity';
import { FilePathSetEntity } from './src/settings/report/filrPathSet/filePathSetEntity';
import { WbcRunCountEntity } from './src/settings/report/runInfoCount/wbcRunCount.entity';
import { MinCountEntity } from './src/settings/report/minCount/minCount.entity';
import { Category } from './src/settings/analysisDatabse/rbcDegree/category.entity';
import { RuningInfoEntity } from './src/runingInfo/runingInfo.entity';
import { ClassOrder } from './src/classOrder/classOrder';
import * as dotenv from 'dotenv';
dotenv.config(); // dotenv 설정 추가

export const createTypeOrmOptions = async (): Promise<TypeOrmModuleOptions> => {
  const options: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST, // 환경 변수 사용
    port: parseInt(process.env.DB_PORT), // 환경 변수 사용
    username: process.env.DB_USERNAME, // 환경 변수 사용
    password: process.env.DB_PASSWORD, // 환경 변수 사용
    database: process.env.DB_DATABASE, // 환경 변수 사용
    synchronize: false,
    migrations: ['src/migrations/**/*{.ts,.js}'],
    entities: [
      User,
      CellImgAnalyzed,
      RbcDegree,
      WbcCustomClass,
      WbcHotKeys,
      BfHotKeys,
      NormalRange,
      ImagePrintEntity,
      LisCodeWbcEntity,
      LisCodeRbcEntity,
      CbcCodeEntity,
      FilePathSetEntity,
      WbcRunCountEntity,
      MinCountEntity,
      Category,
      RuningInfoEntity,
      ClassOrder,
    ],
    extra: {
      connectionLimit: 10,
      multipleStatements: true,
    },
  };

  return options;
};
