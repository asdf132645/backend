import { Entity, Column, PrimaryGeneratedColumn, Unique, Index } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  RbcInfo,
  AbnormalClassInfo,
  WbcInfoAfter,
  WbcResponse,
  RbcAfterClassInfos,
  SlideCondition,
} from './types/class-info'; // 필요에 따라 import 경로 조정

@ObjectType() // GraphQL ObjectType으로 설정
@Entity()
@Unique(['slotId']) // Unique 제약 조건 추가
export class RuningInfoEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @Index('IDX_analyzedDttm_testType', ['analyzedDttm', 'testType']) // 복합 인덱스
  id!: number;

  @Field(() => Boolean, { nullable: true }) // Boolean 타입으로 명시
  @Column({ type: 'boolean', nullable: true }) // boolean 타입 명시
  lock_status?: boolean;

  @Field(() => String, { nullable: true }) // Boolean 타입으로 명시
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  traySlot?: string;

  @Field(() => String)
  @Column({ type: 'varchar' }) // varchar로 명시
  slotNo: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  @Index() // 단일 인덱스
  barcodeNo?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  @Index()
  patientId?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  patientNm?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  gender?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  birthDay?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  wbcCount?: string;

  @Field(() => String)
  @Column({ type: 'varchar' }) // varchar로 명시
  slotId: string;

  @Field(() => String)
  @Column({ type: 'varchar' }) // varchar로 명시
  orderDttm: string;

  @Field(() => String)
  @Column({ type: 'varchar' }) // varchar로 명시
  @Index()
  testType: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  @Index()
  analyzedDttm?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  tactTime?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  maxWbcCount?: string;

  @Field(() => [String], { nullable: true }) // 배열 타입 지정
  @Column('json') // JSON 데이터 타입으로 설정
  bf_lowPowerPath?: string[];

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  cassetId?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' }) // varchar로 명시
  isNormal?: string;

  @Field(() => WbcResponse, { nullable: true }) // 배열 타입 지정
  @Column('json') // JSON 데이터 타입으로 설정
  wbcInfo: WbcResponse;

  @Field(() => [WbcInfoAfter]) // 배열 타입 지정
  @Column('json') // JSON 데이터 타입으로 설정
  wbcInfoAfter: WbcInfoAfter[];

  @Field(() => RbcInfo, { nullable: true })
  @Column('json', { nullable: true }) // JSON으로 저장
  rbcInfo?: RbcInfo;

  @Field(() => [RbcAfterClassInfos], { nullable: true })
  @Column('json', { nullable: true }) // JSON 데이터 타입으로 설정
  rbcInfoAfter?: RbcAfterClassInfos[];

  @Field(() => String, { nullable: true }) // Boolean 타입으로 명시
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  submitState?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'timestamp', nullable: true }) // Date 타입은 timestamp로 설정
  submitOfDate?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  submitUserId?: string;

  @Field(() => [String]) // 배열 타입 지정
  @Column('json') // JSON 데이터 타입으로 설정
  rbcInfoPosAfter?: string[];

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  isNsNbIntegration?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  wbcMemo?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  rbcMemo?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  pcIp?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  cbcPatientNo?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  cbcPatientNm?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  cbcSex?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  cbcAge?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  img_drive_root_path?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ type: 'varchar', nullable: true }) // varchar로 명시
  hosName?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column('json') // JSON 데이터 타입으로 설정
  abnormalClassInfo?: AbnormalClassInfo;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', nullable: true })
  isAllClassesChecked?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'json', nullable: true })
  slideCondition?: SlideCondition;
}
