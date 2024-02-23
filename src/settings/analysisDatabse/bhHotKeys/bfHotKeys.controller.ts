import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { BfHotKeysService } from './bfHotKeys.service';
import { BfHotKeys } from './bfHotKeys.entity';
import { CreateBfHotKeysDto } from './dto/bfHotKeysDto';

@Controller('bfHotKeys')
export class BfHotKeysController {
  constructor(private readonly bfHotKeysService: BfHotKeysService) {}

  @Post('create')
  async create(
    @Param('userId') userId: number,
    @Body() createDto: CreateBfHotKeysDto,
  ): Promise<BfHotKeys> {
    return this.bfHotKeysService.create(createDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateBfHotKeysDto,
  ): Promise<BfHotKeys[]> {
    return this.bfHotKeysService.update(Number(id), updateDto);
  }

  @Get('get/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<BfHotKeys[]> {
    return this.bfHotKeysService.findByUserId(userId);
  }
}
