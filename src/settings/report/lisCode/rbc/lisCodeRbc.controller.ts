import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { LisCodeRbcService } from './lisCodeRbc.service';
import { LisCodeRbcEntity } from './lisCodeRbc.entity';
import { CreateLisCodeRbcDto } from './dto/lisCodeRbcDto';

@Controller('lisCodeRbc')
export class LisCodeController {
  constructor(private readonly lisCode: LisCodeRbcService) {}

  @Post('create')
  async create(
    @Param('userId') userId: number,
    @Body() createDto: CreateLisCodeRbcDto,
  ): Promise<LisCodeRbcEntity> {
    return this.lisCode.create(createDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateLisCodeRbcDto,
  ): Promise<LisCodeRbcEntity[]> {
    return this.lisCode.update(Number(id), updateDto);
  }

  @Get('get/:userId')
  async findByUserId(
    @Param('userId') userId: number,
  ): Promise<LisCodeRbcEntity[]> {
    return this.lisCode.findByUserId(userId);
  }
}
