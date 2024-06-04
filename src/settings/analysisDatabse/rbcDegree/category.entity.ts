import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RbcDegree } from './rbcDegree.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: string;

  @Column()
  category_nm: string;

  @Column()
  class_id: string;

  @Column()
  class_nm: string;

  @Column()
  degree1: string;

  @Column()
  degree2: string;

  @Column()
  degree3: string;

  @Column()
  rbc_degree_id: number;

  @ManyToOne(() => RbcDegree, (rbcDegree) => rbcDegree.categories)
  @JoinColumn({ name: 'rbc_degree_id' }) // 외래 키와의 연결
  rbcDegree: RbcDegree;
}
