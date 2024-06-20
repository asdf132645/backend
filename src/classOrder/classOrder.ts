import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sort_class_order_setting' })
export class ClassOrder {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  abbreviation?: string;

  @Column()
  fullNm?: string;

  @Column()
  orderIdx?: string;
}
