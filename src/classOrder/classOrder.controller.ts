import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ClassOrderDto } from './dto/classOrder.dto';
import { ClassOrderService } from './classOrder.service';

@Controller('classOrders')
export class ClassOrderController {
  constructor(private readonly classOrderService: ClassOrderService) {}

  @Get('get/:userName')
  async getClassOrdersByUserName(
    @Param('userName') userName: string,
  ): Promise<ClassOrderDto[]> {
    return this.classOrderService.getClassOrdersByUserName(Number(userName));
  }

  @Post('create')
  async createClassOrders(@Body() createDtos: any[]): Promise<any[]> {
    return this.classOrderService.createClassOrder(createDtos);
  }

  @Put('update/:userName')
  async updateAllClassOrders(
    @Body() newData: ClassOrderDto[],
  ): Promise<ClassOrderDto[]> {
    return this.classOrderService.updateClassOrders(newData);
  }
}
