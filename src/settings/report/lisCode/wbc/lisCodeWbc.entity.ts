import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LisCodeWbcEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  text: string;

  @Column({ default: '' })
  value: string;

  @Column({ default: '' })
  code: string;
}
