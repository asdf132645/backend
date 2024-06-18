// LisCodeRbcEntity 수정
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lis_code_rbc_setting')
export class LisCodeRbcEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  categoryId: string;

  @Column({ default: '' })
  categoryNm: string;

  @Column({ default: '' })
  classId: string;

  @Column({ default: '' })
  fullNm: string;

  @Column({ default: '0' })
  key: string;
}