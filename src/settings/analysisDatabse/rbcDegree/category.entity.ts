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
  degree: string;

  @Column()
  userId: number;

  @ManyToOne(() => RbcDegree, (rbcDegree) => rbcDegree.categories)
  @JoinColumn({ name: 'userId' }) // 외래 키와의 연결
  rbcDegree: RbcDegree;
}
