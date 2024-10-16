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
import { CrcRemarkSettingEntity } from './entities/crc-remark-setting.entity';

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

  @Get('crcSearch')
  async findByCodeOrRemarkAllContent(
    @Query('code') code?: string,
    @Query('remarkAllContent') remarkAllContent?: string,
  ): Promise<CrcRemarkSettingEntity[]> {
    if (!code && !remarkAllContent) {
      console.log('At least one of code or remarkAllContent must be provided');
    }

    return this.crcRemarkSettingService.findByCodeOrRemarkAllContent(
      code,
      remarkAllContent,
    );
  }
}
