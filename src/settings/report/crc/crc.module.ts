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
import { CrcOption } from './entities/crc-option.entity';
import { CrcOptionController } from './crc-option.controller';
import { CrcOptionService } from './crc-option.service';
import { CrcRecommendationSettingController } from './crc_reco.controller';
import { CrcRecommendationEntity } from './entities/crc_reco.entity';
import { CrcRecommendationService } from './crc_reco.service';
import { CrcCommentEntity } from './entities/crc-comment.entity';
import { CrcCommentSettingController } from './crc-comment-setting.controller';
import { CrcCommentSettingService } from './crc-comment-setting.service';
import { CrcSaveDataEntity } from "./entities/crc_save_data.entity";
import { CrcSaveDataController } from "./crc_save_data.controller";
import { CrcSaveDataService } from "./crc_save_data.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CrcSettingEntity,
      CrcDataSettingEntity,
      CrcRemarkSettingEntity,
      CrcOption,
      CrcRecommendationEntity,
      CrcCommentEntity,
      CrcSaveDataEntity,
    ]),
  ],
  controllers: [
    CrcSettingController,
    CrcDataSettingController,
    CrcRemarkSettingController,
    CrcOptionController,
    CrcRecommendationSettingController,
    CrcCommentSettingController,
    CrcSaveDataController,
  ],
  providers: [
    CrcSettingService,
    CrcDataSettingService,
    CrcRemarkSettingService,
    CrcOptionService,
    CrcRecommendationService,
    CrcCommentSettingService,
    CrcSaveDataService,
  ],
})
export class CrcModule {}
