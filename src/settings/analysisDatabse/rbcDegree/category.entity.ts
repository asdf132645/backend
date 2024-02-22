// src/rbcDegree/category.entity.ts
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
  userId: number; // 외래 키로 사용될 컬럼

  @ManyToOne(() => RbcDegree, (rbcDegree) => rbcDegree.categories)
  @JoinColumn({ name: 'userId' }) // 외래 키와의 연결
  rbcDegree: RbcDegree;
}
