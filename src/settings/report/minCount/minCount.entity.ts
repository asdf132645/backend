import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('min_count_setting')
export class MinCountEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: 0 })
  minGPCount: number;

  @Column({ default: 0 })
  minPACount: number;
}