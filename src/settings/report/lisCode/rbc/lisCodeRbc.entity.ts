// LisCodeRbcEntity 수정
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
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
  classNm: string;

  @Column({ default: '0' })
  code: string;
}