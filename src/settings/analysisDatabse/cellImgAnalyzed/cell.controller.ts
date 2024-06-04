// cell-img-analyzed.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CellImgAnalyzedDto } from './dto/create-cellImg.dto';
import { CellImgAnalyzedService } from './cell.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('cellImgAnalyzed')
@ApiTags('Cell Image Analyzed')
export class CellImgAnalyzedController {
  constructor(
    private readonly cellImgAnalyzedService: CellImgAnalyzedService,
  ) {}

  @Post('cellImgAdd')
  @ApiOperation({
    summary: '새로운 세포 이미지 분석 생성',
    description: '새로운 세포 이미지 분석을 생성합니다.',
  })
  @ApiBody({ type: CellImgAnalyzedDto, description: '세포 이미지 분석 데이터' })
  @ApiResponse({
    status: 201,
    description: '성공적으로 세포 이미지 분석이 생성되었습니다.',
  })
  async create(@Body() dto: CellImgAnalyzedDto) {
    try {
      return await this.cellImgAnalyzedService.create(dto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Put('update/:id')
  @ApiOperation({
    summary: '기존 세포 이미지 분석 갱신',
    description: '기존의 세포 이미지 분석을 ID로 갱신합니다.',
  })
  @ApiParam({ name: 'id', description: '세포 이미지 분석 ID' })
  @ApiBody({ type: CellImgAnalyzedDto, description: '세포 이미지 분석 데이터' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 세포 이미지 분석이 갱신되었습니다.',
  })
  async update(@Param('id') id: string, @Body() dto: CellImgAnalyzedDto) {
    try {
      return await this.cellImgAnalyzedService.update(id, dto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    summary: '세포 이미지 분석 조회',
    description: '세포 이미지 분석을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 세포 이미지 분석이 조회되었습니다.',
  })
  async findByUserId() {
    try {
      return await this.cellImgAnalyzedService.find();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
