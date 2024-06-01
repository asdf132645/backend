// src/wbcCustomClass/wbcCustomClass.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
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
