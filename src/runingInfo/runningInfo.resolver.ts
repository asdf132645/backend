import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { RuningInfoService } from './runingInfo.service';
import { RuningInfoEntity } from './runingInfo.entity';

@Resolver(() => RuningInfoEntity)
export class RunningInfoResolver {
  constructor(private readonly runningInfoService: RuningInfoService) {}

  @Query(() => RuningInfoEntity)
  async getRunningInfoByIdGQL(
    @Args('id', { type: () => Int }) id: number, // GraphQL의 Int로 명시
  ): Promise<RuningInfoEntity> {
    const runningInfo = await this.runningInfoService.getRunningInfoById(id);
    console.log(runningInfo);
    if (runningInfo) {
      return runningInfo;
    }

    return null; // 데이터가 없는 경우 null 반환
  }
}
