import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CellImgAnalyzed } from '../../settings/analysisDatabse/cellImgAnalyzed/entities/cell.entity';
import { RbcDegree } from '../../settings/analysisDatabse/rbcDegree/rbcDegree.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'id' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'honggildong', description: 'User ID' })
  userId: string;

  @Column()
  @ApiProperty({ example: 'hashedPassword', description: 'User password' })
  password: string;

  @Column()
  @ApiProperty({ example: 'Hong Gildong', description: 'User name' })
  name: string;

  @Column()
  @ApiProperty({ example: '12345', description: 'Employee number' })
  employeeNo: string;

  @Column()
  @ApiProperty({ example: 'admin', description: 'User type' })
  userType: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2024-02-13T12:34:56Z',
    description: 'Subscription date',
  })
  subscriptionDate: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2024-02-13T12:34:56Z',
    description: 'Latest update date',
  })
  latestDate: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: 'active', description: 'User state', nullable: true })
  state?: string;

  @OneToOne(() => CellImgAnalyzed, (cellImgAnalyzed) => cellImgAnalyzed.user)
  @JoinColumn({ name: 'userId' })
  cellImgAnalyzed: CellImgAnalyzed;

  @OneToOne(() => RbcDegree, (RbcDegree) => RbcDegree.user)
  @JoinColumn({ name: 'userId' })
  rbcDegrees: RbcDegree[];
}
