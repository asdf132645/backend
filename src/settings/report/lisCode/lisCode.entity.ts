import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class LisCodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: '' })
  categoryId: string;

  @Column({ default: '' })
  categoryNm: string;

  @Column({ default: '' })
  classId: string;

  @Column({ default: '' })
  classNm: string;

  @Column({ default: '' })
  code: string;

  @Column()
  @ApiProperty({ example: 1, description: '관련 사용자의 ID' })
  userId: number;

  @OneToOne(() => User, (userTable) => userTable.lisCode)
  userTable: User;
}
