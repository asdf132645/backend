import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}