// orderList.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
@Entity({ name: 'orderList' })
export class OrderList {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'BARCODE_ID', length: 255, comment: '바코드 ID' })
  cassetteNo: string;

  @Column({ name: 'STATE', length: 255, comment: '상태' })
  barcodeId: string;

  @Column({ name: 'PATIENT_NAME', length: 255, comment: '환자 이름' })
  patientName: string;

  @Column({
    name: 'ORDER_DATE',
    type: 'datetime',
    comment: '주문 일자 및 시간',
  })
  orderDate: Date;

  @CreateDateColumn({ name: 'CREATED_AT', comment: '레코드 생성 시간' })
  createdAt: Date;
}
