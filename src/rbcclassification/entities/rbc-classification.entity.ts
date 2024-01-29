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

  @Column()
  degree: string;
}
