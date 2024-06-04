import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ImagePrintService } from './imagePrint.service';
import { ImagePrintEntity } from './imagePrint.entity';
import { CreateImagePrintDto } from './dto/imgaePrintDto';

@Controller('imagePrint')
export class ImagePrintController {
  constructor(private readonly imagePrintService: ImagePrintService) {}

  @Post('create')
  async create(@Body() createDto: CreateImagePrintDto): Promise<ImagePrintEntity> {
    return this.imagePrintService.create(createDto);
  }

  @Put('update')
  async update(@Body() updateDto: CreateImagePrintDto): Promise<ImagePrintEntity[]> {
    return this.imagePrintService.update(updateDto);
  }

  @Get('get')
  async get(): Promise<ImagePrintEntity[]> {
    return this.imagePrintService.find();
  }
}
