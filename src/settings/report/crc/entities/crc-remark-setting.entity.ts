import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crc_remark_setting')
export class CrcRemarkSettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  remarkContent: string;

  @Column({ nullable: true })
  remarkAllContent: string;
}
