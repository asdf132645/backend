import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { FilePathSetService } from './filePathSet.service';
import { FilePathSetEntity } from './filePathSetEntity';
import { CreateFilePathSetDto } from './dto/filePathSetDto';

@Controller('filePathSet')
export class FilePathSetController {
  constructor(private readonly filePathSetService: FilePathSetService) {}

  @Post('create')
  async create(@Body() createDto: CreateFilePathSetDto): Promise<FilePathSetEntity> {
    return this.filePathSetService.create(createDto);
  }

  @Put('update')
  async update(@Body() updateDto: CreateFilePathSetDto): Promise<FilePathSetEntity[]> {
    return this.filePathSetService.update(updateDto);
  }

  @Get('get')
  async get(): Promise<FilePathSetEntity[]> {
    return this.filePathSetService.find();
  }
}
