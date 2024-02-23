// src/wbcCustomClass/wbcCustomClass.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @Column()
  @ApiProperty({ example: 1, description: '관련 사용자의 ID' })
  userId: number;

  @OneToOne(() => User, (user) => user.wbcCustomClass)
  @JoinColumn({ name: 'userId' })
  user: User;
}
