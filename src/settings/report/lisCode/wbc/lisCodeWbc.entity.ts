import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lis_code_wbc_setting')
export class LisCodeWbcEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  fullNm: string;

  @Column({ default: '' })
  classId: string;

  @Column({ default: '' })
  key: string;
}
