import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CrcRecommendationService } from './crc_reco.service';
import { CreateCrcRecoDto } from './dto/crc_reco.dto';

@Controller('crc-recommendation-setting')
export class CrcRecommendationSettingController {
  constructor(
    private readonly crcRecommendationSettingService: CrcRecommendationService,
  ) {}

  @Post('crcRecommendationCreate')
  create(@Body() createCrcRecommendationDto: CreateCrcRecoDto) {
    return this.crcRecommendationSettingService.create(
      createCrcRecommendationDto,
    );
  }

  @Get('crcRecommendationFindAll')
  findAll() {
    return this.crcRecommendationSettingService.findAll();
  }

  @Get('crcRSearch')
  find(
    @Query('code') code?: string,
    @Query('RecommendationAllContent') RecommendationAllContent?: string,
  ) {
    {
      // 검색 서비스 호출
      return this.crcRecommendationSettingService.findByCodeOrRecommendationAllContent(
        code,
        RecommendationAllContent,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crcRecommendationSettingService.findOne(+id);
  }

  @Delete('crcRecommendationRemove')
  remove(@Body('id') id: string) {
    return this.crcRecommendationSettingService.remove(+id);
  }

  @Put('crcRecommendationUpdate')
  update(@Body() updateCrcSettingDtos: any[]) {
    return this.crcRecommendationSettingService.update(updateCrcSettingDtos);
  }
}
