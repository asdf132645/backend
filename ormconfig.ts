
// ormconfig.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './src/user/entities/user.entity';
import { ProcessInfo } from './src/processinfo/entities/proinfo.entity';
import { OrderList } from './src/orderList/entities/orderList.entity';
export const createTypeOrmOptions = async (): Promise<TypeOrmModuleOptions> => {
  const options: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'coin',
    password: 'uimd5191!',
    database: 'pb_db',
    synchronize: false,
    migrations: ['src/migrations/**/*{.ts,.js}'],
    entities: [User, ProcessInfo, OrderList],
    extra: {
      connectionLimit: 10,
      multipleStatements: true,
    },
  };

  return options;
};
