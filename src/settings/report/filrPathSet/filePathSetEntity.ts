import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FilePathSetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  lisHotKey: string;

  @Column({ default: '' })
  lisFilePath: string;

  @Column({ default: '' })
  cbcFilePath: string;

  @Column()
  @ApiProperty({ example: 1, description: '관련 사용자의 ID' })
  userId: number;

  @OneToOne(() => User, (userTable) => userTable.filePathSet)
  userTable: User;
}
