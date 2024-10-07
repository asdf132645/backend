import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CrcRemarkSettingService } from './crc-remark-setting.service';
import { CreateCrcRemarkSettingDto } from './dto/crc-remark-setting.dto';

@Controller('crc-remark-setting')
export class CrcRemarkSettingController {
  constructor(
    private readonly crcRemarkSettingService: CrcRemarkSettingService,
  ) {}

  @Post()
  create(@Body() createCrcRemarkSettingDto: CreateCrcRemarkSettingDto) {
    return this.crcRemarkSettingService.create(createCrcRemarkSettingDto);
  }

  @Get()
  findAll() {
    return this.crcRemarkSettingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crcRemarkSettingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crcRemarkSettingService.remove(+id);
  }
}
