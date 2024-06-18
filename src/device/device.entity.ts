import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'device'})
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: '0000'})
  siteCd: string;

  @Column({default: '2024050000000'})
  deviceSerialNm: string;

  @Column()
  pcIp: string;
}