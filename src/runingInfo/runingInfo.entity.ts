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

  // @Column()
  // createDate: string;

  // @Column()
  // pltCount: string;
  //
  // @Column()
  // malariaCount: string;
  //
  // @Column()
  // maxRbcCount: string;

  // @Column()
  // stateCd: string;

  @Column()
  tactTime: string;

  @Column()
  maxWbcCount: string;

  @Column('json')
  bf_lowPowerPath: any[];

  // @Column('json')
  // runningPath: any[];

  // @Column('json')
  // bminfo: any[];

  // @Column()
  // userId: number;

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

  // @Column('json')
  // processInfo: {
  //   cassetteNo: number;
  //   barcodeId: string;
  //   patientId: string;
  //   patientName: string;
  //   wbcCount: string;
  //   orderDate: string;
  //   analyzedDttm: string;
  // };

  // @Column('json')
  // orderList: {
  //   barcodeId: string;
  //   patientName: string;
  //   orderDate: string;
  //   analyzedDttm: string;
  //   state: string;
  // }[];
  @Column()
  submitState?: string;

  @Column()
  submitOfDate?: Date;

  @Column()
  submitUserId?: string;

  @Column('json')
  rbcInfoPosAfter: any[];

  // @Column('json')
  // classificationResult?: any[];

  @Column()
  isNsNbIntegration?: string;

  @Column()
  wbcMemo?: string;

  @Column()
  rbcMemo?: string;

  @Column()
  pcIp?: string;

  // @Column()
  // siteCd?: string;

  // @Column()
  // deviceBarcode?: string;

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
