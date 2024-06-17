// src/wbcCustomClass/wbcCustomClass.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('wbc_custom_class_setting')
export class WbcCustomClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  abbreviation: string;

  @Column()
  className: string;

  @Column()
  customNum: number;
}
