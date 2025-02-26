import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  AbnormalClassInfo,
  RbcAfterClassInfos,
  RbcInfo,
  SlideCondition,
  WbcInfoAfter,
  WbcResponse,
} from '../types/class-info';
import { UpdateRuningInfoDtoItems } from './UpdateRuningInfoDtoItems';

@ObjectType()
@InputType()
export class RuningInfoDtoItems {
  @IsInt()
  @Field(() => Int)
  id: number;

  @Field(() => Boolean, { nullable: true })
  lock_status?: boolean;

  @Field(() => String, { nullable: true })
  @IsString()
  traySlot?: string;

  @Field(() => String)
  slotNo: string;

  @Field(() => String, { nullable: true })
  barcodeNo?: string;

  @Field(() => String, { nullable: true })
  patientId?: string;

  @Field(() => String, { nullable: true })
  patientNm?: string;

  @Field(() => String, { nullable: true })
  gender?: string;

  @Field(() => String, { nullable: true })
  birthDay?: string;

  @Field(() => String, { nullable: true })
  wbcCount?: string;

  @Field(() => String)
  slotId: string;

  @Field(() => String)
  orderDttm: string;

  @Field(() => String)
  testType: string;

  @Field(() => String)
  analyzedDttm: string;

  @Field(() => String)
  tactTime: string;

  @Field(() => String, { nullable: true })
  maxWbcCount?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  bf_lowPowerPath?: string[];

  @Field(() => WbcResponse, { nullable: 'itemsAndList' })
  wbcInfo?: WbcResponse;

  @Field(() => [WbcInfoAfter], { nullable: 'itemsAndList' })
  wbcInfoAfter?: WbcInfoAfter[];

  @Field(() => RbcInfo, { nullable: true })
  rbcInfo?: RbcInfo;

  @Field(() => [RbcAfterClassInfos], { nullable: true })
  rbcInfoAfter: RbcAfterClassInfos[];

  @Field(() => String)
  cassetId: string;

  @Field(() => String, { nullable: true })
  isNormal?: string;

  @Field(() => String, { nullable: true })
  submitState?: string;

  @Field(() => String, { nullable: true })
  submitOfDate?: string;

  @Field(() => String, { nullable: true })
  submitUserId?: string;

  @Field(() => [String], { nullable: true })
  classificationResult?: string[];

  @Field(() => String)
  isNsNbIntegration?: string;

  @Field(() => String, { nullable: true })
  wbcMemo?: string;

  @Field(() => String, { nullable: true })
  rbcMemo?: string;

  @Field(() => String, { nullable: true })
  pcIp?: string;

  @Field(() => String, { nullable: true })
  cbcPatientNo?: string;

  @Field(() => String, { nullable: true })
  cbcPatientNm?: string;

  @Field(() => String, { nullable: true })
  cbcSex?: string;

  @Field(() => String, { nullable: true })
  cbcAge?: string;

  @Field(() => String, { nullable: true })
  img_drive_root_path?: string;

  @Field(() => String, { nullable: true })
  hosName?: string;

  @Field(() => [AbnormalClassInfo], { nullable: 'itemsAndList' })
  abnormalClassInfo?: AbnormalClassInfo[];

  @Field(() => Boolean, { nullable: true })
  isAllClassesChecked?: boolean;

  @Field(() => SlideCondition, { nullable: true })
  slideCondition?: SlideCondition;
}

@InputType()
export class CreateRuningInfoDto {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  userId?: number;

  @Field(() => RuningInfoDtoItems)
  @ValidateNested({ each: true })
  @Type(() => RuningInfoDtoItems)
  runingInfoDtoItems: RuningInfoDtoItems;

  @Field(() => String)
  dayQuery: string;
}

@InputType()
export class UpdateRuningInfoDto {
  @Field(() => Int, { nullable: true })
  @IsInt()
  userId?: number;

  @Field(() => String, { nullable: true })
  dayQuery?: string;

  @IsArray()
  @Field(() => [UpdateRuningInfoDtoItems], { nullable: 'itemsAndList' }) // 업데이트 전용 InputType을 사용
  @ValidateNested({ each: true })
  @Type(() => UpdateRuningInfoDtoItems)
  runingInfoDtoItems?: UpdateRuningInfoDtoItems[];
}
