import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CrcOptionService } from './crc-option.service';
import { CrcOption } from './entities/crc-option.entity';

@Controller('crc-option')
export class CrcOptionController {
  constructor(private readonly crcOptionService: CrcOptionService) {}

  // 모든 옵션 가져오기
  @Get('crcOptionGet')
  async findAll(): Promise<CrcOption[]> {
    return this.crcOptionService.findAll();
  }

  // 특정 옵션 가져오기
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CrcOption> {
    return this.crcOptionService.findOne(id);
  }

  // 옵션 생성
  @Post('crcOptionCreate')
  async create(@Body() crcOptionData: Partial<CrcOption>): Promise<CrcOption> {
    return this.crcOptionService.create(crcOptionData);
  }

  // 옵션 업데이트
  @Put('crcOptionUpdate')
  async update(
    @Body()
    crcOptionData: { id: number; crcMode?: boolean; crcConnect?: boolean }, // Body에서 id와 함께 데이터를 받음
  ): Promise<CrcOption> {
    return this.crcOptionService.update(crcOptionData); // 서비스로 데이터를 넘김 (id 포함)
  }
  // 옵션 삭제
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.crcOptionService.delete(id);
  }
}
