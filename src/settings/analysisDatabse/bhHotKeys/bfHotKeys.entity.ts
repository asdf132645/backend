// src/wbc-hot-keys/wbc-hot-keys.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bf_hot_keys_setting')
export class BfHotKeys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  abbreviation: string;

  @Column()
  fullNm: string;

  @Column()
  key: string;

  @Column()
  orderIdx: number;
}
