// ormconfig.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'newuser',
  password: '0000',
  database: 'newserver',
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*.js'], // 변경
  entities: ['dist/**/*.entity.js'],
  extra: {
    connectionLimit: 10,
    multipleStatements: true,
  },
};

export default config;
