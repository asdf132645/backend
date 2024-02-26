import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LisCodeEntity } from './lisCode.entity';
import { LisCodeService } from './lisCode.service';
import { LisCodeController } from './lisCode.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LisCodeEntity])],
  providers: [LisCodeService],
  exports: [LisCodeService],
  controllers: [LisCodeController],
})
export class LisCodeModule {}
