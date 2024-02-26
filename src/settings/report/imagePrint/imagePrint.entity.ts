import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ImagePrintEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  text: string;

  @Column()
  value: string;

  @Column({ default: '' })
  code: string;

  @Column({ default: false })
  checked: boolean;

  @Column()
  @ApiProperty({ example: 1, description: '관련 사용자의 ID' })
  userId: number;

  @OneToOne(() => User, (userTable) => userTable.imagePrint)
  userTable: User;
}
