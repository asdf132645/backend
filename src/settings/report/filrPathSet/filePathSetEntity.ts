import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lis_cbc_path_setting')
export class FilePathSetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  lisHotKey: string;

  @Column({ default: '' })
  lisFilePath: string;

  @Column({ default: '' })
  cbcFilePath: string;
}
