import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ClassOrderDto } from './dto/classOrder.dto';
import { ClassOrderService } from './classOrder.service';

@Controller('classOrders')
export class ClassOrderController {
  constructor(private readonly classOrderService: ClassOrderService) {}

  @Get('get')
  async getAllClassOrders(): Promise<ClassOrderDto[]> {
    return this.classOrderService.getAllClassOrders();
  }

  @Post('create')
  async createClassOrder(
    @Body() createDto: ClassOrderDto,
  ): Promise<ClassOrderDto> {
    return this.classOrderService.createClassOrder(createDto);
  }

  @Put('update/:id')
  async updateClassOrder(
    @Param('id') id: number,
    @Body() updateDto: ClassOrderDto,
  ): Promise<ClassOrderDto | null> {
    return this.classOrderService.updateClassOrder(id, updateDto);
  }
}
