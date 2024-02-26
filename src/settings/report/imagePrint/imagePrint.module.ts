import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagePrintEntity } from './imagePrint.entity';
import { ImagePrintService } from './imagePrint.service';
import { ImagePrintController } from './imagePrint.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ImagePrintEntity])],
  providers: [ImagePrintService],
  exports: [ImagePrintService],
  controllers: [ImagePrintController],
})
export class ImagePrintModule {}
