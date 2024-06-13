import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    getUser(userId: string): Promise<{
        user: {};
        code: number;
        success?: undefined;
        error?: undefined;
    } | {
        user: import("./entities/user.entity").User;
        code: number;
        success?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        user?: undefined;
        code?: undefined;
    }>;
    getALLUsers(userId: string): Promise<{
        users: import("./entities/user.entity").User[];
        code: number;
        success?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        users?: undefined;
        code?: undefined;
    }>;
    loginUser({ userId, password }: {
        userId: string;
        password: string;
    }): Promise<{
        user: import("./entities/user.entity").User;
        success?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        user?: undefined;
    }>;
    updateUser({ pcIp, viewerCheck, userId }: Partial<CreateUserDto>): Promise<{
        user: import("./entities/user.entity").User;
        code: number;
        success?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        user?: undefined;
        code?: undefined;
    }>;
}
