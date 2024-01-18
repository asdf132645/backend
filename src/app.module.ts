import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmOptions } from '../ormconfig'; // 위에서 만든 설정 파일 import
import { UserModule } from './user/user.module';
import { TcpClientModule } from './services/tcp-client.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: createTypeOrmOptions, // Use the modified function
    }),
    UserModule,
    TcpClientModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
