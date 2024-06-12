import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('category')
export class RbcDegree {
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
}
