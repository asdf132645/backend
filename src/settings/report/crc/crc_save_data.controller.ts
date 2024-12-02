import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CrcSaveDataService } from './crc_save_data.service';
import { CrcSaveDataEntity } from './entities/crc_save_data.entity';

@Controller('crc-save-data')
export class CrcSaveDataController {
  constructor(private readonly crcSaveDataService: CrcSaveDataService) {}

  @Get()
  async findAll(): Promise<CrcSaveDataEntity[]> {
    return this.crcSaveDataService.findAll();
  }

  @Get('saveDataSlotIdGet/:slotId')
  async findOne(
    @Param('slotId') slotId: string,
  ): Promise<CrcSaveDataEntity | []> {
    const data = await this.crcSaveDataService.findOneBySlotId(slotId);
    return data ? data : [];
  }

  @Post('saveDataCreate')
  async create(
    @Body() data: Partial<CrcSaveDataEntity>,
  ): Promise<CrcSaveDataEntity> {
    return this.crcSaveDataService.create(data);
  }

  @Put('saveDataPutData')
  async update(
    @Body() data: Partial<CrcSaveDataEntity>,
  ): Promise<CrcSaveDataEntity> {
    return this.crcSaveDataService.updateBySlotId(data.slotId, data);
  }

  @Delete('saveDataDelete')
  async delete(@Body() slotId: string): Promise<void> {
    return this.crcSaveDataService.deleteBySlotId(slotId);
  }
}
