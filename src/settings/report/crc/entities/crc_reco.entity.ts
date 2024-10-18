import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crc_recommendation_setting')
export class CrcRecommendationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  remarkContent: string;

  @Column({ nullable: true })
  remarkAllContent: string;
}
