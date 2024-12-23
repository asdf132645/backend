import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import {
  RbcAfterClassInfos,
  WbcInfoAfter,
  WbcResponse,
} from '../types/class-info';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateRuningInfoDtoItems {
  @IsInt()
  @Field(() => Int)
  id: number; // 필수 필드

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  lock_status?: boolean;

  @IsOptional()
  @Field(() => String, { nullable: true })
  traySlot?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  slotNo?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  barcodeNo?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  patientId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  patientNm?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  gender?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  birthDay?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  wbcCount?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  slotId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  orderDttm?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  testType?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  analyzedDttm?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  tactTime?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  maxWbcCount?: string;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  bf_lowPowerPath?: string[];

  @IsOptional()
  @Field(() => String, { nullable: true })
  cassetId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  isNormal?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  submitState?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  submitOfDate?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  submitUserId?: string;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  rbcInfoPosAfter?: string[];

  @IsOptional()
  @Field(() => String, { nullable: true })
  isNsNbIntegration?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  wbcMemo?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  rbcMemo?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  pcIp?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  cbcPatientNo?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  cbcPatientNm?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  cbcSex?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  cbcAge?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  img_drive_root_path?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  hosName?: string;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true }) // JSON 타입으로 정의
  abnormalClassInfo?: any; // 실제 JSON 객체로 다루기

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isAllClassesChecked?: boolean;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  wbcInfo?: WbcResponse; // JSON 데이터는 String으로 처리 (GraphQL 제한 고려)

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  wbcInfoAfter?: WbcInfoAfter[];

  @IsOptional()
  @Field(() => String, { nullable: true })
  rbcInfo?: string; // JSON 데이터는 String으로 처리

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  rbcInfoAfter: RbcAfterClassInfos[];
}
