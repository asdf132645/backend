import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CbcCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  cd: string;

  @Column()
  testCd: string;

  @Column({ default: '' })
  testNm: string;

  @Column({ default: false })
  isSelected: boolean;

  @Column()
  @ApiProperty({ example: 1, description: '관련 사용자의 ID' })
  userId: number;

  @OneToOne(() => User, (userTable) => userTable.cbcCode)
  userTable: User;
}
