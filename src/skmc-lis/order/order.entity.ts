// order.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SP_IF01Q1' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'barcodeNo' })
  barcodeNo: string;
}
