// wbc-classification.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WBCClassification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class: string;

  @Column()
  count: number;

  @Column()
  percent: number;
}
