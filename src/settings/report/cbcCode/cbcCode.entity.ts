import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CbcCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  cd: string;

  @Column()
  testCd: string;

  @Column({ default: '' })
  testNm: string;

  @Column({ default: false })
  isSelected: boolean;
}
