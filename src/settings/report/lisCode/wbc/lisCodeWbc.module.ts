import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LisCodeWbcEntity } from './lisCodeWbc.entity';
import { LisCodeWbcService } from './lisCodeWbc.service';
import { LisCodeWbcController } from './lisCodeWbc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LisCodeWbcEntity])],
  providers: [LisCodeWbcService],
  exports: [LisCodeWbcService],
  controllers: [LisCodeWbcController],
})
export class LisCodeWbcModule {}
