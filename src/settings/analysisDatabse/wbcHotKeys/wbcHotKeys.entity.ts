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

  @Column()
  key: string;

  @Column()
  order: number;

  @Column()
  @ApiProperty({ example: 1, description: '관련 사용자의 ID' })
  userId: number;

  @OneToOne(() => User, (userTable) => userTable.wbcHotKeys)
  userTable: User;
}
