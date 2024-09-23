import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RuningInfoService } from './runingInfo.service';
import { RuningInfoEntity } from './runingInfo.entity';
import { CreateRuningInfoDto } from './dto/runingInfoDtoItems';

@Resolver(() => RuningInfoEntity)
export class RuningInfoResolver {
  constructor(private readonly runningInfoService: RuningInfoService) {}

  @Mutation(() => RuningInfoEntity)
  async createRunningInfo(
    @Args('createRunningInfoDto') createRunningInfoDto: CreateRuningInfoDto,
  ): Promise<RuningInfoEntity> {
    const newEntity =
      await this.runningInfoService.create(createRunningInfoDto);
    console.log('resolver');
    if (!newEntity) {
      throw new Error(
        'Failed to create running info: entity already exists within the time frame.',
      );
    }
    return newEntity;
  }

  @Query(() => RuningInfoEntity, { nullable: true })
  async getRunningInfoById(
    @Args('id') id: number,
  ): Promise<RuningInfoEntity | null> {
    const entity = await this.runningInfoService.getRunningInfoById(id);
    if (!entity) {
      throw new Error(`Running info with id ${id} not found.`);
    }
    return entity;
  }
}
