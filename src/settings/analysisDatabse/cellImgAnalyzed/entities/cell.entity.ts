// cell-img-analyzed.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cell_img_analyzed_setting')
export class CellImgAnalyzed {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: '세포 이미지 분석 ID' })
  id: number;

  @Column()
  @ApiProperty({ example: '01', description: '분석 유형' })
  analysisType: string;

  @Column()
  @ApiProperty({ example: '100', description: '세포 분석 횟수' })
  diffCellAnalyzingCount: string;

  @Column()
  @ApiProperty({ example: '100', description: 'PBS 분석 유형 2' })
  pbsCellAnalyzingCount: string;

  @Column()
  @ApiProperty({ example: '100', description: 'BF 분석 유형' })
  bfCellAnalyzingCount: string;

  @Column()
  @ApiProperty({ example: '0', description: 'WBC 위치 여백' })
  diffWbcPositionMargin: string;

  @Column()
  @ApiProperty({ example: '0', description: 'RBC 위치 여백' })
  diffRbcPositionMargin: string;

  @Column()
  @ApiProperty({ example: '0', description: 'PLT 위치 여백' })
  diffPltPositionMargin: string;

  @Column()
  @ApiProperty({ example: '1', description: '스티치 카운트' })
  stitchCount: string;

  @Column()
  @ApiProperty({ example: '0', description: 'Side Edge Wbc Mode' })
  sideEdgeWbcMode: string;

  @Column()
  @ApiProperty({ example: '', description: 'IA 루트 경로' })
  iaRootPath: string;

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
  @ApiProperty({ example: '0000-00-00', description: '백업 시작 날짜' })
  backupStartDate: Date;

  @Column({ type: 'date' })
  @ApiProperty({ example: '0000-00-00', description: '백업 종료 날짜' })
  backupEndDate: Date;

  @Column()
  @ApiProperty({ example: '1', description: '자동 백업 날짜' })
  autoBackUpMonth: string;

  @Column({ type: 'date' })
  @ApiProperty({ example: '0000-00-00', description: '자동 저장 시작 날짜' })
  autoBackUpStartDate: Date;
}
