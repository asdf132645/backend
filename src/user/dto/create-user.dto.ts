export class CreateUserDto {
  userId: string;
  password: string;
  name: string;
  employeeNo: string;
  userType: string;
  subscriptionDate: Date;
  latestDate: Date;
  state?: string;
}
