import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crc_comment_setting')
export class CrcCommentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  remarkContent: string;

  @Column({ nullable: true })
  remarkAllContent: string;
}
