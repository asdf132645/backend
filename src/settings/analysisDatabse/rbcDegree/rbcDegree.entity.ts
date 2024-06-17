import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rbc_degree_setting')
export class RbcDegree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: string;

  @Column()
  categoryNm: string;

  @Column()
  classId: string;

  @Column()
  classNm: string;

  @Column()
  degree1: string;

  @Column()
  degree2: string;

  @Column()
  degree3: string;
}
