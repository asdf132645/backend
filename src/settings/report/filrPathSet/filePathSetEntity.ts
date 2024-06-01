import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
