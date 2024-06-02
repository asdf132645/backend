import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WbcRunCountEntity {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ default: '' })
  id: string;

  @Column({ default: 0 })
  min: number;

  @Column({ default: 0 })
  max: number;

  @Column({ default: 0 })
  wbcCount: number;
}
