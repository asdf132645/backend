export declare class CreateUserDto {
    userId: string;
    password: string;
    name: string;
    employeeNo: string;
    userType: string;
    subscriptionDate: Date;
    latestDate: Date;
    state?: string;
    pcIp?: string;
    viewerCheck?: string;
}
export declare class UserResponse {
    userId: string;
    password: string;
    name: string;
    employeeNo: string;
    userType: string;
    subscriptionDate: Date;
    latestDate: Date;
    state?: string;
    pcIp?: string;
    viewerCheck?: string;
}
export declare class LoginDto {
    userId: string;
    password: string;
}
