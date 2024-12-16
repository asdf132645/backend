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
  abnormalClassInfo,
  RbcAfterClassInfos,
  RbcInfo,
  WbcInfoAfter,
  WbcResponse,
} from '../types/class-info';

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

  @Field(() => String)
  barcodeNo: string;

  @Field(() => String)
  patientId: string;

  @Field(() => String)
  patientNm: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  birthDay: string;

  @Field(() => String)
  wbcCount: string;

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

  @Field(() => String)
  maxWbcCount: string;

  @Field(() => [String])
  bf_lowPowerPath: string[];

  @Field(() => WbcResponse, { nullable: true })
  wbcInfo?: WbcResponse;

  @Field(() => [WbcInfoAfter], { nullable: 'itemsAndList' })
  wbcInfoAfter?: WbcInfoAfter[];

  @Field(() => RbcInfo, { nullable: true })
  rbcInfo?: RbcInfo;

  @Field(() => [RbcAfterClassInfos], { nullable: true })
  rbcInfoAfter: RbcAfterClassInfos[];

  @Field(() => String)
  cassetId: string;

  @Field(() => String)
  isNormal: string;

  @Field(() => String, { nullable: true })
  submitState?: string;

  @Field(() => Date, { nullable: true })
  submitOfDate?: Date;

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

  @Field(() => String)
  pcIp: string;

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

  @Field(() => abnormalClassInfo, { nullable: true })
  abnormalClassInfo?: abnormalClassInfo;
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
  @Field(() => Int)
  @IsInt()
  userId: number;

  @Field(() => String)
  dayQuery: string;

  @IsArray()
  @Field(() => [RuningInfoDtoItems])
  @ValidateNested({ each: true })
  @Type(() => RuningInfoDtoItems)
  runingInfoDtoItems: RuningInfoDtoItems[];
}
