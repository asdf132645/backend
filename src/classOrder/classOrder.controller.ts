import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { ClassOrderDto } from './dto/classOrder.dto';
import { ClassOrderService } from './classOrder.service';

@Controller('classOrders')
export class ClassOrderController {
  constructor(private readonly classOrderService: ClassOrderService) {}

  @Get('get')
  async getClassOrdersByUserName(): Promise<ClassOrderDto[]> {
    return this.classOrderService.getClassOrders();
  }

  @Post('create')
  async createClassOrders(@Body() createDtos: any[]): Promise<any[]> {
    return this.classOrderService.createClassOrder(createDtos);
  }

  @Put('update')
  async updateAllClassOrders(
    @Body() newData: ClassOrderDto[],
  ): Promise<ClassOrderDto[]> {
    return this.classOrderService.updateClassOrders(newData);
  }
}
