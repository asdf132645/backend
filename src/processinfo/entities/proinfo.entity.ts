// proinfo.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

@Entity({ name: 'processinfo' })
export class ProcessInfo  {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'CASSETTE_NO', length: 255, comment: '카세트 번호' })
  cassetteNo: string;

  @Column({ name: 'BARCODE_ID', length: 255, comment: '바코드 ID' })
  barcodeId: string;

  @Column({ name: 'PATIENT_ID', length: 255, comment: '환자 ID' })
  patientId: string;

  @Column({ name: 'PATIENT_NAME', length: 255, comment: '환자 이름' })
  patientName: string;

  @Column({ name: 'WBC_COUNT', comment: 'WBC 수' })
  wbcCount: number;

  @Column({ name: 'ORDER_DATE', type: 'datetime', comment: '주문 일자 및 시간' })
  orderDate: Date;

  @Column({ name: 'OIL_COUNT', comment: 'OIL 카운트' })
  oilCount: number;

  @CreateDateColumn({ name: 'CREATED_AT', comment: '레코드 생성 시간' })
  createdAt: Date;
}
