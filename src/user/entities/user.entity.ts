// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  // 다른 필드들도 추가 가능

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
