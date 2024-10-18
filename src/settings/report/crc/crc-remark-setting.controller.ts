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
import { CrcRemarkSettingService } from './crc-remark-setting.service';
import { CreateCrcRemarkSettingDto } from './dto/crc-remark-setting.dto';

@Controller('crc-remark-setting')
export class CrcRemarkSettingController {
  constructor(
    private readonly crcRemarkSettingService: CrcRemarkSettingService,
  ) {}

  @Post('crcRemarkCreate')
  create(@Body() createCrcRemarkSettingDto: CreateCrcRemarkSettingDto) {
    return this.crcRemarkSettingService.create(createCrcRemarkSettingDto);
  }

  @Get('crcRemarkFindAll')
  findAll() {
    return this.crcRemarkSettingService.findAll();
  }

  @Get('crcRemark')
  find(
    @Query('code') code?: string,
    @Query('remarkAllContent') remarkAllContent?: string,
  ) {
    {
      // 검색 서비스 호출
      return this.crcRemarkSettingService.findByCodeOrRemarkAllContent(
        code,
        remarkAllContent,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crcRemarkSettingService.findOne(+id);
  }

  @Delete('crcRemarkRemove')
  remove(@Body('id') id: string) {
    return this.crcRemarkSettingService.remove(+id);
  }

  @Put('crcRemarkUpdate')
  update(@Body() updateCrcSettingDtos: any[]) {
    return this.crcRemarkSettingService.update(updateCrcSettingDtos);
  }
}
