import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { FilePathSetService } from './filePathSet.service';
import { FilePathSetEntity } from './filePathSetEntity';
import { CreateFilePathSetDto } from './dto/filePathSetDto';

@Controller('filePathSet')
export class FilePathSetController {
  constructor(private readonly filePathSetService: FilePathSetService) {}

  @Post('create')
  async create(
    @Param('userId') userId: number,
    @Body() createDto: CreateFilePathSetDto,
  ): Promise<FilePathSetEntity> {
    return this.filePathSetService.create(createDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateFilePathSetDto,
  ): Promise<FilePathSetEntity[]> {
    return this.filePathSetService.update(Number(id), updateDto);
  }

  @Get('get/:userId')
  async findByUserId(
    @Param('userId') userId: number,
  ): Promise<FilePathSetEntity[]> {
    return this.filePathSetService.findByUserId(userId);
  }
}
