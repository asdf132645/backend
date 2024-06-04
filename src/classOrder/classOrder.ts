import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'class_order' })
export class ClassOrder {
  @PrimaryGeneratedColumn()
  idx?: number;

  @Column()
  id?: number;

  @Column()
  classId?: string;

  @Column()
  title?: string;

  @Column()
  name?: string;

  @Column()
  count?: string;

  @Column()
  percentText?: string;

  @Column()
  keyText?: string;

  @Column()
  orderText?: string;
}
