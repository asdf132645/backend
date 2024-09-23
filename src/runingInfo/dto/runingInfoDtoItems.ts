import { IsArray, IsInt, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType() // 추가
export class RuningInfoDtoItems {
  @IsInt()
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  lock_status?: boolean;

  @Field()
  traySlot?: string;

  @Field()
  slotNo: string;

  @Field()
  barcodeNo: string;

  @Field()
  patientId: string;

  @Field()
  patientNm: string;

  @Field()
  gender: string;

  @Field()
  birthDay: string;

  @Field()
  wbcCount: string;

  @Field()
  slotId: string;

  @Field()
  orderDttm: string;

  @Field()
  testType: string;

  @Field()
  analyzedDttm: string;

  @Field()
  tactTime: string;

  @Field()
  maxWbcCount: string;

  @Field(() => [String]) // Change this to a more specific type if possible
  bf_lowPowerPath: string[];

  @Field(() => [String])
  wbcInfo: string[];

  @Field(() => [String], { nullable: true })
  wbcInfoAfter?: string[];

  @Field(() => [String])
  rbcInfo: string[];

  @Field(() => [String])
  rbcInfoAfter: string[];

  @Field()
  cassetId: string;

  @Field()
  isNormal: string;

  @Field({ nullable: true })
  submitState?: string;

  @Field({ nullable: true })
  submitOfDate?: Date;

  @Field({ nullable: true })
  submitUserId?: string;

  @Field(() => [String], { nullable: true })
  classificationResult?: string[];

  @Field()
  isNsNbIntegration?: string;

  @Field({ nullable: true })
  wbcMemo?: string;

  @Field({ nullable: true })
  rbcMemo?: string;

  @Field()
  pcIp: string;

  @Field({ nullable: true })
  cbcPatientNo?: string;

  @Field({ nullable: true })
  cbcPatientNm?: string;

  @Field({ nullable: true })
  cbcSex?: string;

  @Field({ nullable: true })
  cbcAge?: string;

  @Field({ nullable: true })
  img_drive_root_path?: string;
}

@InputType() // 추가
export class CreateRuningInfoDto {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsArray()
  @Field(() => RuningInfoDtoItems) // Change to reflect an array of items
  @ValidateNested({ each: true })
  @Type(() => RuningInfoDtoItems)
  runingInfoDtoItems: RuningInfoDtoItems;

  @Field() // Specify the type for dayQuery, for example:
  dayQuery: string; // Adjust the type based on your actual use case
}

@InputType() // 추가
export class UpdateRuningInfoDto {
  @Field(() => Int)
  @IsInt()
  userId: number;

  @Field()
  dayQuery: string;

  @IsArray()
  @Field(() => [RuningInfoDtoItems])
  @ValidateNested({ each: true })
  @Type(() => RuningInfoDtoItems)
  runingInfoDtoItems: RuningInfoDtoItems[];
}
