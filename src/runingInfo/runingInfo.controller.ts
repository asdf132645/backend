import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Delete,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { RuningInfoService } from './runingInfo.service';
import {
  CreateRuningInfoDto,
  UpdateRuningInfoDto,
} from './dto/runingInfoDtoItems';
import { RuningInfoEntity } from './runingInfo.entity';
import * as moment from 'moment';
import { RedisCacheInterceptor } from '../cache/cache.interceptor';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Controller('runningInfo')
export class RuningInfoController {
  constructor(
    private readonly runingInfoService: RuningInfoService,
    @InjectRedis() private readonly redis: Redis, // Redis 인스턴스 주입
  ) {}

  @Get('pageUpDown')
  async getPageUpDown(
    @Query('id') id: string,
    @Query('step') step: string,
    @Query('type') type: string,
    @Query('dayQuery') dayQuery: string,
  ): Promise<Partial<RuningInfoEntity> | null> {
    await this.redis.del(dayQuery); // 해당 쿼리로 생성된 캐시 삭제
    return this.runingInfoService.getUpDownRunnInfo(
      Number(id),
      Number(step),
      type,
    );
  }

  @Get('clearPcIpState')
  async clearPcIpAndState(
    @Query('oldPcIp') oldPcIp: string,
    @Query('dayQuery') dayQuery: string,
  ): Promise<void> {
    await this.redis.del(dayQuery); // 해당 쿼리로 생성된 캐시 삭제
    await this.runingInfoService.clearPcIpAndState(oldPcIp);
  }

  @Get('updatePcIpState')
  async updatePcIpAndState(
    @Query('oldPcIp') oldPcIp: string,
    @Query('newEntityId') newEntityId: number,
    @Query('newPcIp') newPcIp: string,
    @Query('dayQuery') dayQuery: string,
  ): Promise<void> {
    await this.redis.del(dayQuery); // 해당 쿼리로 생성된 캐시 삭제
    await this.runingInfoService.updatePcIpAndState(
      oldPcIp,
      newEntityId,
      newPcIp,
    );
  }

  @Post('create')
  async create(
    @Body() createDto: CreateRuningInfoDto,
  ): Promise<RuningInfoEntity> {
    const createdEntity = await this.runingInfoService.create(createDto);

    // 캐시 갱신 로직 추가 (선택 사항)
    const cacheKey = `GET:/api/runningInfo/detail/${createdEntity.id}?`;
    await this.redis.set(cacheKey, JSON.stringify(createdEntity), 'EX', 1800); // 1시간 TTL로 캐싱

    return createdEntity;
  }

  @Delete('delete')
  async deleteMultiple(@Body() req: any): Promise<{ success: boolean }> {
    await this.redis.del(req?.dayQuery); // 해당 쿼리로 생성된 캐시 삭제

    const result = await this.runingInfoService.delete(
      req.ids,
      req.img_drive_root_path,
    );
    return { success: result };
  }

  @Put('update')
  async update(
    @Body() updateDto: UpdateRuningInfoDto,
  ): Promise<RuningInfoEntity[]> {
    await this.redis.del(updateDto?.dayQuery);
    // 데이터베이스 업데이트 수행
    const updatedEntities = await this.runingInfoService.update(updateDto);

    // 캐시 무효화
    await Promise.all(
      updateDto.runingInfoDtoItems.map(async (item: any) => {
        // 관련된 다른 캐시 키도 무효화
        const relatedCacheKeys = [
          `GET:/api/runningInfo/detail/${item.id}?`,
          `GET:/api/runningInfo/classInfoDetail/${item.id}?`,
          `GET:/api/runningInfo/classInfoDetailSelectQuery/${item.id}?`,
          `GET:/api/runningInfo/classInfoMenuDetailSelectQuery/${item.id}?`,
        ];

        await Promise.all(relatedCacheKeys.map((key) => this.redis.del(key)));
      }),
    );

    return updatedEntities;
  }

  @Get('detail/:id')
  @UseInterceptors(RedisCacheInterceptor)
  async getRunningInfoById(
    @Param('id') id: string,
  ): Promise<RuningInfoEntity | null> {
    return this.runingInfoService.getRunningInfoById(Number(id));
  }

  @Get('classInfoDetail/:id')
  @UseInterceptors(RedisCacheInterceptor)
  async getRunningInfoDetailById(
    @Param('id') id: string,
  ): Promise<RuningInfoEntity | null> {
    return this.runingInfoService.getRunningInfoClassDetail(Number(id));
  }

  @Get('classInfoDetailSelectQuery/:id')
  @UseInterceptors(RedisCacheInterceptor)
  async getRunningInfoClassInfoByIdDetail(
    @Param('id') id: string,
  ): Promise<RuningInfoEntity | null> {
    return this.runingInfoService.getRunningInfoClassInfo(Number(id));
  }

  @Get('classInfoMenuDetailSelectQuery/:id')
  @UseInterceptors(RedisCacheInterceptor)
  async getRunningInfoClassInfoMenuByIdDetail(
    @Param('id') id: string,
  ): Promise<RuningInfoEntity | null> {
    return this.runingInfoService.getRunningInfoClassInfoMenu(Number(id));
  }

  @Get('getAll')
  @UseInterceptors(RedisCacheInterceptor)
  async findAllWithPagingAndFilter(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('startDay') startDay?: string,
    @Query('endDay') endDay?: string,
    @Query('barcodeNo') barcodeNo?: string,
    @Query('patientId') patientId?: string,
    @Query('patientNm') patientNm?: string,
    @Query('nrCount') nrCount?: string,
    @Query('title') titles?: string,
    @Query('testType') testType?: string,
    @Query('wbcCountOrder') wbcCountOrder?: string,
  ): Promise<{ data: RuningInfoEntity[]; total: number; page: number }> {
    // 입력된 날짜 문자열을 Date 객체로 변환
    const startDate = startDay ? moment(startDay).toDate() : undefined;
    const endDate = endDay ? moment(endDay).toDate() : undefined;

    // titles 문자열을 쉼표로 분리하여 배열로 변환
    let titlesArray: string[] | undefined;
    if (titles) {
      titlesArray = titles.split(',');
    }

    // RuningInfoService를 호출하여 결과를 가져옵니다.
    const result = await this.runingInfoService.findAllWithPagingAndFilter(
      page,
      pageSize,
      startDate,
      endDate,
      barcodeNo,
      patientId,
      patientNm,
      nrCount,
      titlesArray,
      testType,
      wbcCountOrder,
    );

    return { data: result.data, total: result.total, page };
  }
}
