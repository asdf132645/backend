import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('wbc_run_count_setting')
export class WbcRunCountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  min: number;

  @Column({ default: 0 })
  max: number;

  @Column({ default: 0 })
  wbcCount: number;
}
