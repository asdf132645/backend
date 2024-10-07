import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrcSettingService } from './crc-setting.service';
import { CrcDataSettingService } from './crc-data-setting.service';
import { CrcRemarkSettingService } from './crc-remark-setting.service';
import { CrcSettingController } from './crc-setting.controller';
import { CrcDataSettingController } from './crc-data-setting.controller';
import { CrcRemarkSettingController } from './crc-remark-setting.controller';
import { CrcSettingEntity } from './entities/crc-setting.entity';
import { CrcDataSettingEntity } from './entities/crc-data-setting.entity';
import { CrcRemarkSettingEntity } from './entities/crc-remark-setting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CrcSettingEntity,
      CrcDataSettingEntity,
      CrcRemarkSettingEntity,
    ]),
  ],
  controllers: [
    CrcSettingController,
    CrcDataSettingController,
    CrcRemarkSettingController,
  ],
  providers: [
    CrcSettingService,
    CrcDataSettingService,
    CrcRemarkSettingService,
  ],
})
export class CrcModule {}
