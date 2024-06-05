// src/rbcDegree/rbcDegree.entity.ts
import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class RbcDegree {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Category, (category) => category.rbcDegree)
  @JoinColumn({
    name: 'rbc_degree_category_id',
    referencedColumnName: 'rbc_degree_category_id',
  })
  categories: Category[];

  @Column()
  rbc_degree_category_id: number;
}
