// src/wbc-hot-keys/wbc-hot-keys.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NormalRange {
  @PrimaryGeneratedColumn()
  num: number;

  @Column()
  classId: string;

  @Column({ default: 0 })
  min: string;

  @Column({ default: 0 })
  max: string;

  @Column()
  unit: string;

  @Column()
  title: string;

  @Column()
  name: string;
}
