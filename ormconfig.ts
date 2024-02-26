// ormconfig.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './src/user/entities/user.entity';
import { CellImgAnalyzed } from './src/settings/analysisDatabse/cellImgAnalyzed/entities/cell.entity';
import { RbcDegree } from './src/settings/analysisDatabse/rbcDegree/rbcDegree.entity';
import { WbcCustomClass } from './src/settings/analysisDatabse/wbcCustomClass/wbcCustomClass.entity';
import { WbcHotKeys } from './src/settings/analysisDatabse/wbcHotKeys/wbcHotKeys.entity';
import { BfHotKeys } from './src/settings/analysisDatabse/bhHotKeys/bfHotKeys.entity';
import { NormalRange } from './src/settings/analysisDatabse/normalRange/normalRange.entity';
import { ImagePrintEntity } from './src/settings/report/imagePrint/imagePrint.entity';

import { Category } from './src/settings/analysisDatabse/rbcDegree/category.entity';
import { ProcessInfo } from './src/processinfo/entities/proinfo.entity';
import { OrderList } from './src/orderList/entities/orderList.entity';
import { RBCClassification } from './src/rbcclassification/entities/rbc_classification.entity';
import { WBCClassification } from './src/wbcclassification/entities/wbc-classification.entity';
export const createTypeOrmOptions = async (): Promise<TypeOrmModuleOptions> => {
  const options: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'uimd5191!',
    database: 'pb_db',
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
      Category,
      ProcessInfo,
      OrderList,
      RBCClassification,
      WBCClassification,
    ],
    extra: {
      connectionLimit: 10,
      multipleStatements: true,
    },
  };

  return options;
};
