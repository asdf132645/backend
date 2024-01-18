// ormconfig.ts
import { DataSource } from 'typeorm';
const config = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'newuser',
  password: '0000',
  database: 'newserver',
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/**/*{.ts,.js}'],
  entities: ['src/**/**.entity{.ts,.js}'],
  extra: {
    connectionLimit: 10,
    multipleStatements: true,
  },
});

export default config;
