import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { LisCode } from './lisCode.service';
import { LisCodeEntity } from './lisCode.entity';
import { CreateLisCodeDto } from './dto/lisCodeDto';

@Controller('lisCode')
export class ImagePrintController {
  constructor(private readonly lisCode: LisCode) {}

  @Post('create')
  async create(
    @Param('userId') userId: number,
    @Body() createDto: CreateLisCodeDto,
  ): Promise<LisCodeEntity> {
    return this.lisCode.create(createDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateLisCodeDto,
  ): Promise<LisCodeEntity[]> {
    return this.lisCode.update(Number(id), updateDto);
  }

  @Get('get/:userId')
  async findByUserId(
    @Param('userId') userId: number,
  ): Promise<LisCodeEntity[]> {
    return this.lisCode.findByUserId(userId);
  }
}
