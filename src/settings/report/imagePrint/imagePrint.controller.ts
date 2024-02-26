import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ImagePrintService } from './imagePrint.service';
import { ImagePrintEntity } from './imagePrint.entity';
import { CreateImagePrintDto } from './dto/imgaePrintDto';

@Controller('imagePrint')
export class ImagePrintController {
  constructor(private readonly imagePrintService: ImagePrintService) {}

  @Post('create')
  async create(
    @Param('userId') userId: number,
    @Body() createDto: CreateImagePrintDto,
  ): Promise<ImagePrintEntity> {
    return this.imagePrintService.create(createDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateImagePrintDto,
  ): Promise<ImagePrintEntity[]> {
    return this.imagePrintService.update(Number(id), updateDto);
  }

  @Get('get/:userId')
  async findByUserId(
    @Param('userId') userId: number,
  ): Promise<ImagePrintEntity[]> {
    return this.imagePrintService.findByUserId(userId);
  }
}
