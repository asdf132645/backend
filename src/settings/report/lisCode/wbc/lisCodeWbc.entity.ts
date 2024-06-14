import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lis_code_wbc_setting')
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
