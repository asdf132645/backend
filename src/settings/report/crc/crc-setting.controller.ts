import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CrcSettingService } from './crc-setting.service';
import { CreateCrcSettingDto } from './dto/crc-setting.dto';

@Controller('crc-setting')
export class CrcSettingController {
  constructor(private readonly crcSettingService: CrcSettingService) {}

  @Post()
  create(@Body() createCrcSettingDto: CreateCrcSettingDto) {
    return this.crcSettingService.create(createCrcSettingDto);
  }

  @Get()
  findAll() {
    return this.crcSettingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crcSettingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crcSettingService.remove(+id);
  }
}
