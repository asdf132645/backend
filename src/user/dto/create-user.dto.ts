import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'honggildong', description: 'User ID' })
  userId: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;

  @ApiProperty({ example: '홍길동', description: 'User name' })
  name: string;

  @ApiProperty({ example: '12345', description: 'Employee number' })
  employeeNo: string;

  @ApiProperty({ example: 'admin', description: 'User type' })
  userType: string;

  @ApiProperty({
    example: '2024-02-13T12:34:56Z',
    description: 'Subscription date',
  })
  subscriptionDate: Date;

  @ApiProperty({
    example: '2024-02-13T12:34:56Z',
    description: 'Latest update date',
  })
  latestDate: Date;

  // @ApiProperty({ example: 'pcIp', description: 'pcIp', nullable: true })
  // pcIp?: string;
}


export class UserResponse {
  @ApiProperty({ example: 'honggildong', description: 'User ID' })
  userId: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;

  @ApiProperty({ example: '홍길동', description: 'User name' })
  name: string;

  @ApiProperty({ example: '12345', description: 'Employee number' })
  employeeNo: string;

  @ApiProperty({ example: 'admin', description: 'User type' })
  userType: string;

  @ApiProperty({
    example: '2024-02-13T12:34:56Z',
    description: 'Subscription date',
  })
  subscriptionDate: Date;

  @ApiProperty({
    example: '2024-02-13T12:34:56Z',
    description: 'Latest update date',
  })
  latestDate: Date;

  // @ApiProperty({ example: 'pcIp', description: 'pcIp', nullable: true })
  // pcIp?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'honggildong', description: 'User ID' })
  userId: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;
}
