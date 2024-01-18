// ormconfig.ts
import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './src/user/entities/user.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'newuser',
  password: '0000',
  database: 'newserver',
  synchronize: false,
  migrations: ['src/migrations/**/*{.ts,.js}'],
  entities: [User],
  extra: {
    connectionLimit: 10,
    multipleStatements: true,
  },
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
  });

export const createTypeOrmOptions = async (): Promise<TypeOrmModuleOptions> => {
  await dataSource.initialize();

  const options: TypeOrmModuleOptions = {
    type: dataSource.options.type as any,
    host: 'localhost',
    port: 3306,
    username: 'newuser',
    password: '0000',
    database: dataSource.options.database as string,
    synchronize: dataSource.options.synchronize as boolean,
    migrations: dataSource.options.migrations as string[],
    entities: dataSource.options.entities as any,
    extra: dataSource.options.extra as Record<string, any>,
  };

  return options;
};
