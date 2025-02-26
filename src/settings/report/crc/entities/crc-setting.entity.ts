import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crc_setting')
export class CrcSettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  crcTitle: string;

  @Column()
  crcType: string;

  @Column({ nullable: true })
  crcPercentText: string;

  @Column()
  morphologyType: string;

  @Column()
  crcContent: string;

  @Column()
  crcCode: string;

  @Column()
  crcCodeMatching: string;

  @Column()
  cbcCode: string;
}
