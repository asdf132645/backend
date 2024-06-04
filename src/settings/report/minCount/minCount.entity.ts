import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MinCountEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: 0 })
  minGpCount: number;

  @Column({ default: 0 })
  minPaCount: number;
}