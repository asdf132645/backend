import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType() // GraphQL ObjectType으로 설정
@Entity()
@Unique(['slotId']) // Unique 제약 조건 추가
export class RuningInfoEntity {
  @Field() // GraphQL 필드로 설정
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  lock_status?: boolean;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  traySlot?: string;

  @Field()
  @Column()
  slotNo: string;

  @Field()
  @Column()
  barcodeNo: string;

  @Field()
  @Column()
  patientId: string;

  @Field()
  @Column()
  patientNm: string;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  birthDay: string;

  @Field()
  @Column()
  wbcCount: string;

  @Field()
  @Column()
  slotId: string;

  @Field()
  @Column()
  orderDttm: string;

  @Field()
  @Column()
  testType: string;

  @Field()
  @Column()
  analyzedDttm: string;

  @Field()
  @Column()
  tactTime: string;

  @Field()
  @Column()
  maxWbcCount: string;

  @Field(() => [String]) // 배열 타입 지정
  @Column('json')
  bf_lowPowerPath: any[];

  @Field()
  @Column()
  cassetId: string;

  @Field()
  @Column()
  isNormal: string;

  @Field(() => [String]) // 배열 타입 지정
  @Column('json')
  wbcInfo: any[];

  @Field(() => [String]) // 배열 타입 지정
  @Column('json')
  wbcInfoAfter: any[];

  @Field(() => [String]) // 배열 타입 지정
  @Column('json')
  rbcInfo: any[];

  @Field(() => [String]) // 배열 타입 지정
  @Column('json')
  rbcInfoAfter: any[];

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  submitState?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  submitOfDate?: Date;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  submitUserId?: string;

  @Field(() => [String]) // 배열 타입 지정
  @Column('json')
  rbcInfoPosAfter: any[];

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  isNsNbIntegration?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  wbcMemo?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  rbcMemo?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  pcIp?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  cbcPatientNo?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  cbcPatientNm?: string;


  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  cbcSex?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  cbcAge?: string;

  @Field({ nullable: true }) // nullable 옵션 추가
  @Column({ nullable: true })
  img_drive_root_path?: string;
}
