import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crc_setting')
export class CrcSettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  crcTitle: string;

  @Column()
  crcType: string;

  @Column({ nullable: true })
  crcPercentText: string;
}
