import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LisCodeRbcEntity } from './lisCodeRbc.entity';
import { LisCodeRbcService } from './lisCodeRbc.service';
import { LisCodeController } from './lisCodeRbc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LisCodeRbcEntity])],
  providers: [LisCodeRbcService],
  exports: [LisCodeRbcService],
  controllers: [LisCodeController],
})
export class LisCodeRbcModule {}
