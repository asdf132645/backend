export class UserDto {
  id: number;
  username: string;
  email: string;
  // 다른 필드들도 추가 가능

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
