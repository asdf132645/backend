import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilePathSetEntity } from './filePathSetEntity';
import { FilePathSetService } from './filePathSet.service';
import { FilePathSetController } from './filePathSet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilePathSetEntity])],
  providers: [FilePathSetService],
  exports: [FilePathSetService],
  controllers: [FilePathSetController],
})
export class FilePathSetModule {}
