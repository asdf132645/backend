import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crc_option')
export class CrcOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  crcMode: boolean;

  @Column({ type: 'boolean' })
  crcConnect: boolean;
}
