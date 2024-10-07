import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CrcDataSettingService } from './crc-data-setting.service';
import { CreateCrcDataSettingDto } from './dto/crc-data-setting.dto';

@Controller('crc-data-setting')
export class CrcDataSettingController {
  constructor(private readonly crcDataSettingService: CrcDataSettingService) {}

  @Post()
  create(@Body() createCrcDataSettingDto: CreateCrcDataSettingDto) {
    return this.crcDataSettingService.create(createCrcDataSettingDto);
  }

  @Get()
  findAll() {
    return this.crcDataSettingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crcDataSettingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crcDataSettingService.remove(+id);
  }
}
