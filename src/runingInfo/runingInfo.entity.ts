// runing-info.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['slotId']) // Unique 제약 조건 추가
export class RuningInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lock_status?: boolean;

  @Column()
  traySlot?: string;

  @Column()
  slotNo: string;

  @Column()
  barcodeNo: string;

  @Column()
  patientId: string;

  @Column()
  patientNm: string;

  @Column()
  gender: string;

  @Column()
  birthDay: string;

  @Column()
  wbcCount: string;

  @Column()
  slotId: string;

  @Column()
  orderDttm: string;

  @Column()
  testType: string;

  @Column()
  analyzedDttm: string;

  @Column()
  tactTime: string;

  @Column()
  maxWbcCount: string;

  @Column('json')
  bf_lowPowerPath: any[];

  @Column()
  cassetId: string;

  @Column()
  isNormal: string;

  @Column('json')
  wbcInfo: any[];

  @Column('json')
  wbcInfoAfter: any[];

  // @Column('json')
  // bmInfoAfter: any[];

  @Column('json')
  rbcInfo: any[];

  @Column('json')
  rbcInfoAfter: any[];

  @Column()
  submitState?: string;

  @Column()
  submitOfDate?: Date;

  @Column()
  submitUserId?: string;

  @Column('json')
  rbcInfoPosAfter: any[];

  @Column()
  isNsNbIntegration?: string;

  @Column()
  wbcMemo?: string;

  @Column()
  rbcMemo?: string;

  @Column()
  pcIp?: string;

  @Column()
  cbcPatientNo?: string;

  @Column()
  cbcPatientNm?: string;

  @Column()
  cbcSex?: string;

  @Column()
  cbcAge?: string;

  @Column()
  img_drive_root_path?: string;
}
