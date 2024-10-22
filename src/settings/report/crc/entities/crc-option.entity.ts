import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crc_option')
export class CrcOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  crcMode: boolean;

  @Column({ type: 'boolean' })
  crcConnect: boolean;

  @Column({ type: 'json', nullable: true })
  crcRemarkCount: string[];

  @Column()
  crcPassWord: string;
}
