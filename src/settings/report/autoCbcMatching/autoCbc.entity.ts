import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AutoCbc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cbc_code: string;

  @Column()
  conditional: string;

  @Column()
  mo_type: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  sex: string;

  @Column()
  age: string;

  @Column()
  ageCategory: string;

  @Column({ nullable: true })
  orderIdx: string;
}
