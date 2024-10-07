import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crc_data_setting')
export class CrcDataSettingEntity {
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

  @Column({ nullable: true })
  crcRemark: string;
}
