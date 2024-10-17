import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { CrcDataSettingService } from './crc-data-setting.service';
import { CreateCrcDataSettingDto } from './dto/crc-data-setting.dto';

@Controller('crc-data-setting')
export class CrcDataSettingController {
  constructor(private readonly crcDataSettingService: CrcDataSettingService) {}

  @Post('crcDataCreate')
  create(@Body() createCrcDataSettingDto: CreateCrcDataSettingDto) {
    return this.crcDataSettingService.create(createCrcDataSettingDto);
  }

  @Get('crcDataDFindAll')
  findAll() {
    return this.crcDataSettingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crcDataSettingService.findOne(+id);
  }

  @Delete('crcDataRemove')
  remove(@Body('id') id: string) {
    return this.crcDataSettingService.remove(+id);
  }

  @Put('crcDataUpdate')
  update(@Body() updateCrcSettingDtos: any[]) {
    return this.crcDataSettingService.update(updateCrcSettingDtos);
  }
}
