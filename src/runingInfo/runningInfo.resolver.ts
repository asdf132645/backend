import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { RuningInfoService } from './runingInfo.service';
import { RuningInfoEntity } from './runingInfo.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Resolver(() => RuningInfoEntity)
export class RunningInfoResolver {
  constructor(
    private readonly runningInfoService: RuningInfoService,
    @InjectRedis() private readonly redis: Redis, // Redis 인스턴스 주입
  ) {}

  @Query(() => RuningInfoEntity)
  async getRunningInfoByIdGQL(
    @Args('id', { type: () => Int }) id: number, // GraphQL의 Int로 명시
  ): Promise<RuningInfoEntity> {
    await this.redis.flushall(); // 모든 키 삭제
    const runningInfo = await this.runningInfoService.getRunningInfoById(id);
    console.log(runningInfo);
    if (runningInfo) {
      return runningInfo;
    }

    return null; // 데이터가 없는 경우 null 반환
  }
}
