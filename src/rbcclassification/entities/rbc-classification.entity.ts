// rbc-classification.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RBCClassification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  class: string;

  @Column('float')  // 변경된 부분: 'float'로 데이터 타입 변경
  degree: number;   // 변경된 부분: 'string'에서 'number'로 변경
}
