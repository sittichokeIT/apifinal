import { UserDto } from 'src/user/dto/user.dto/user-dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepo;
    users: UserDto[];
    constructor(userRepo: Repository<User>);
    create(users: UserDto): Promise<string>;
    loadAll(): Promise<UserDto[]>;
    updateTime(users: UserDto): Promise<string>;
    deleteflight(users: UserDto): Promise<UserDto>;
}
