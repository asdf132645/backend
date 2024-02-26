import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WbcRunCountEntity {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ default: '' })
  id: string;

  @Column({ default: 0 })
  min: number;

  @Column({ default: 0 })
  max: number;

  @Column({ default: 0 })
  wbcCount: number;

  @Column()
  @ApiProperty({ example: 1, description: '관련 사용자의 ID' })
  userId: number;
}
