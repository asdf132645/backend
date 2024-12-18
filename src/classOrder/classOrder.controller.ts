import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { ClassOrderDto } from './dto/classOrder.dto';
import { ClassOrderService } from './classOrder.service';

@Controller('classOrders')
export class ClassOrderController {
  constructor(private readonly classOrderService: ClassOrderService) {}

  @Get('classOrdersGet')
  async getClassOrdersByUserName(): Promise<ClassOrderDto[]> {
    return this.classOrderService.getClassOrders();
  }

  @Post('classOrdersCreate')
  async createClassOrders(@Body() createDtos: any[]): Promise<any[]> {
    return this.classOrderService.createClassOrder(createDtos);
  }

  @Put('classOrdersUpdate')
  async updateAllClassOrders(
    @Body() newData: ClassOrderDto[],
  ): Promise<ClassOrderDto[]> {
    return this.classOrderService.updateClassOrders(newData);
  }
}
