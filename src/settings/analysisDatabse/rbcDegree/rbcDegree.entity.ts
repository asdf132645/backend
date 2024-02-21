// src/rbcDegree/rbcDegree.entity.ts
import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { Category } from './category.entity';

@Entity()
export class RbcDegree {
  @PrimaryGeneratedColumn() // 이 부분을 추가하면서 기본 키를 설정합니다.
  id: number;

  @OneToMany(() => Category, (category) => category.rbcDegree)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  categories: Category[];

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.rbcDegrees)
  @JoinColumn({ name: 'userId' })
  user: User;
}
