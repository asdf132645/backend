import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crc_save_data')
export class CrcSaveDataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  slotId: string;

  @Column({ length: 255 })
  code: string;

  @Column('json')
  crcDataArr: any;

  @Column('json')
  crcArr: any;

  @Column('json')
  remarkList: any;

  @Column('json')
  commentList: any;

  @Column('json')
  recoList: any;
}
