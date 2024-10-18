import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CrcCommentSettingService } from './crc-comment-setting.service';
import { CreateCrcCommentDto } from './dto/crc-comment-setting.dto';

@Controller('crc-comment-setting')
export class CrcCommentSettingController {
  constructor(
    private readonly crcCommentSettingService: CrcCommentSettingService,
  ) {}

  @Post('crcCommentCreate')
  create(@Body() createCrcCommentDto: CreateCrcCommentDto) {
    return this.crcCommentSettingService.create(createCrcCommentDto);
  }

  @Get('crcCommentFindAll')
  findAll() {
    return this.crcCommentSettingService.findAll();
  }

  @Get('crcCommentSearch')
  find(
    @Query('code') code?: string,
    @Query('CommentAllContent') CommentAllContent?: string,
  ) {
    {
      // 검색 서비스 호출
      return this.crcCommentSettingService.findByCodeOrCommentAllContent(
        code,
        CommentAllContent,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crcCommentSettingService.findOne(+id);
  }

  @Delete('crcCommentRemove')
  remove(@Body('id') id: string) {
    return this.crcCommentSettingService.remove(+id);
  }

  @Put('crcCommentUpdate')
  update(@Body() updateCrcSettingDtos: any[]) {
    return this.crcCommentSettingService.update(updateCrcSettingDtos);
  }
}
