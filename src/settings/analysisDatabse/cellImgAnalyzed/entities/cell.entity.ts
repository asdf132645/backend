// cell-img-analyzed.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cell_img_analyzed')
export class CellImgAnalyzed {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: '세포 이미지 분석 ID' })
  id: number;

  @Column()
  @ApiProperty({ example: '01', description: '분석 유형' })
  analysisType: string;

  @Column()
  @ApiProperty({ example: '100', description: '세포 분석 횟수' })
  cellAnalyzingCount: string;

  @Column()
  @ApiProperty({ example: '0', description: 'WBC 위치 여백' })
  wbcPositionMargin: string;

  @Column()
  @ApiProperty({ example: '0', description: 'RBC 위치 여백' })
  rbcPositionMargin: string;

  @Column()
  @ApiProperty({ example: '0', description: 'PLT 위치 여백' })
  pltPositionMargin: string;

  @Column()
  @ApiProperty({ example: '100', description: 'PBS 분석 유형 2' })
  pbAnalysisType2: string;

  @Column()
  @ApiProperty({ example: '1', description: '스티치 카운트' })
  stitchCount: string;

  @Column()
  @ApiProperty({ example: '100', description: 'BF 분석 유형' })
  bfAnalysisType: string;

  @Column()
  @ApiProperty({ example: '', description: 'IA 루트 경로' })
  pbiaRootPath: string;

  @Column()
  @ApiProperty({ example: false, description: 'NS/NB 통합 여부' })
  isNsNbIntegration: boolean;

  @Column()
  @ApiProperty({ example: false, description: '알람 여부' })
  isAlarm: boolean;

  @Column()
  @ApiProperty({ example: '0', description: '알람 카운트' })
  alarmCount: string;

  @Column()
  @ApiProperty({ example: false, description: '페이지 유지 여부' })
  keepPage: boolean;

  @Column()
  @ApiProperty({ example: '', description: '백업 경로' })
  backupPath: string;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2024-02-20', description: '백업 시작 날짜' })
  backupStartDate: Date;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2024-02-20', description: '백업 종료 날짜' })
  backupEndDate: Date;

  @Column()
  @ApiProperty({ example: 1, description: '관련 사용자의 ID' })
  userId: number;

  @OneToOne(() => User, (user) => user.cellImgAnalyzed)
  @JoinColumn({ name: 'userId' })
  user: User;
}
