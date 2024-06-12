import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(userId: string, password: string): Promise<User | undefined>;
    findOneById(userId: string): Promise<User | undefined>;
    findAll(userId: string): Promise<User[] | undefined>;
    update(userId: string, { pcIp, viewerCheck }: Partial<CreateUserDto>): Promise<User | undefined>;
}
