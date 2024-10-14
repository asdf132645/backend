import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crc_data_setting')
export class CrcDataSettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column('json')
  crcContent: string[];

  @Column({ nullable: true })
  crcRemark: string[];
}
