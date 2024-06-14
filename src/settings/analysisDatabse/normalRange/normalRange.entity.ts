// src/wbc-hot-keys/wbc-hot-keys.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('normal_range_setting')
export class NormalRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  classId: string;

  @Column({ default: 0 })
  min: string;

  @Column({ default: 0 })
  max: string;

  @Column()
  unit: string;

  @Column()
  abbreviation: string;

  @Column()
  fullNm: string;
}
