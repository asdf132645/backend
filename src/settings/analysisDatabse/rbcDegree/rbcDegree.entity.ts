import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn, JoinColumn
} from "typeorm";
import { Category } from './category.entity';

@Entity()
export class RbcDegree {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Category, (category) => category.rbcDegree)
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  categories: Category[];
}