import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class MinCountEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: 0 })
  minGpCount: number;

  @Column({ default: 0 })
  minPaCount: number;

  @Column()
  @ApiProperty({ example: 1, description: '관련 사용자의 ID' })
  userId: number;
}
