import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoCbc } from './autoCbc.entity';
import { AutoCbcService } from './autoCbc.service';
import { AutoCbcController } from './autoCbc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AutoCbc])],
  providers: [AutoCbcService],
  controllers: [AutoCbcController],
})
export class AutoCbcModule {}
