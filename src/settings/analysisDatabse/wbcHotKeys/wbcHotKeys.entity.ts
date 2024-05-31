// src/wbc-hot-keys/wbc-hot-keys.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WbcHotKeys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  count: number;

  @Column({ default: 0 })
  percent: number;

  @Column({ default: '' })
  key: string;

  @Column()
  order: number;
}
