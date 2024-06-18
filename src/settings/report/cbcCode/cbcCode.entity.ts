import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cbc_code_setting')
export class CbcCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  cd: string;

  @Column()
  classCd: string;

  @Column({ default: '' })
  fullNm: string;

  @Column({ default: false })
  isSelected: boolean;
}
