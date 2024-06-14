// src/wbc-hot-keys/wbc-hot-keys.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('wbc_hot_keys_setting')
export class WbcHotKeys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  abbreviation: string;

  @Column()
  fullNm: string;

  @Column({ default: '' })
  key: string;

  @Column()
  orderIdx: number;
}
