import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('image_print_setting')
export class ImagePrintEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  fullNm: string;

  @Column()
  classId: string;

  @Column({ default: false })
  checked: boolean;
}