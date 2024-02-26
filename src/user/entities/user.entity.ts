// User 엔터티 수정
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
import { WbcCustomClass } from '../../settings/analysisDatabse/wbcCustomClass/wbcCustomClass.entity';
import { WbcHotKeys } from '../../settings/analysisDatabse/wbcHotKeys/wbcHotKeys.entity';
import { NormalRange } from '../../settings/analysisDatabse/normalRange/normalRange.entity';
import { ImagePrintEntity } from '../../settings/report/imagePrint/imagePrint.entity';
import { LisCodeEntity } from '../../settings/report/lisCode/wbc/lisCode.entity';
import { LisCodeRbcEntity } from '../../settings/report/lisCode/rbc/lisCodeRbc.entity';
import { CbcCodeEntity } from '../../settings/report/cbcCode/cbcCode.entity';
import { FilePathSetEntity } from '../../settings/report/filrPathSet/filePathSetEntity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'id' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'honggildong', description: 'User login ID' })
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

  @OneToOne(() => WbcCustomClass, (WbcCustomClass) => WbcCustomClass.user)
  @JoinColumn({ name: 'userId' })
  wbcCustomClass: WbcCustomClass;

  @OneToOne(() => WbcHotKeys, { cascade: true })
  @JoinColumn({ name: 'userId' })
  wbcHotKeys: WbcHotKeys;

  @OneToOne(() => NormalRange, { cascade: true })
  @JoinColumn({ name: 'userId' })
  normalRange: NormalRange;

  @OneToOne(() => ImagePrintEntity, { cascade: true })
  @JoinColumn({ name: 'userId' })
  imagePrint: ImagePrintEntity;

  @OneToOne(() => LisCodeEntity, { cascade: true })
  @JoinColumn({ name: 'userId' })
  lisCode: LisCodeEntity;

  @OneToOne(() => LisCodeRbcEntity, { cascade: true })
  @JoinColumn({ name: 'userId' })
  lisCodeRbc: LisCodeRbcEntity;

  @OneToOne(() => CbcCodeEntity, { cascade: true })
  @JoinColumn({ name: 'userId' })
  cbcCode: CbcCodeEntity;

  @OneToOne(() => FilePathSetEntity, { cascade: true })
  @JoinColumn({ name: 'userId' })
  filePathSet: FilePathSetEntity;
}
