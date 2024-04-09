import { Module } from '@nestjs/common';
import { IpService } from './ipService.service';
import { IpController } from './ipService.controller';

@Module({
  providers: [IpService],
  controllers: [IpController],
})
export class IpModule {}
