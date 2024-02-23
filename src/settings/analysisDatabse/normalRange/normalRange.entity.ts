// src/wbc-hot-keys/wbc-hot-keys.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class NormalRange {
  @PrimaryGeneratedColumn()
  classId: string;

  @Column({ default: 0 })
  min: string;

  @Column({ default: 0 })
  max: string;

  @Column()
  unit: string;

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  @ApiProperty({ example: 1, description: '관련 사용자의 ID' })
  userId: number;

  @OneToOne(() => User, (userTable) => userTable.normalRange)
  userTable: User;
}
