import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('wbc_count_by_condition_setting')
export class WbcRunCountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  min: number;

  @Column({ default: 0 })
  max: number;

  @Column({ default: 0 })
  wbcTargetCount: number;
}
