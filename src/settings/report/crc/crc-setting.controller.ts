import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CrcSettingService } from './crc-setting.service';
import {
  CreateCrcSettingDto,
  UpdateCrcSettingDto,
} from './dto/crc-setting.dto';

@Controller('crc-setting')
export class CrcSettingController {
  constructor(private readonly crcSettingService: CrcSettingService) {}

  @Post()
  create(@Body() createCrcSettingDto: CreateCrcSettingDto[]) {
    return this.crcSettingService.create(createCrcSettingDto);
  }

  @Get('crc-get')
  findAll() {
    return this.crcSettingService.findAll();
  }

  @Put('crc-put')
  update(@Body() updateCrcSettingDtos: UpdateCrcSettingDto[]) {
    return this.crcSettingService.update(updateCrcSettingDtos);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crcSettingService.findOne(+id);
  }

  @Delete('crcDel')
  remove(@Body('id') id: string) {
    return this.crcSettingService.remove(+id);
  }
}
