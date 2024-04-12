import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClassOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  classId: string;

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  count: string;

  @Column()
  percentText: string;

  @Column()
  keyText: string;

  @Column()
  orderText: string;
}
