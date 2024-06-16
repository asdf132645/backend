import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('image_print_setting')
export class ImagePrintEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  classNm: string;

  @Column()
  value: string;

  @Column({ default: false })
  checked: boolean;
}