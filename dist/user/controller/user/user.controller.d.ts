import { UserDto } from 'src/user/dto/user.dto/user-dto';
import { UserService } from 'src/user/services/user/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: UserDto): Promise<string>;
    loadAll(): Promise<UserDto[]>;
    updateTime(data: UserDto): Promise<string>;
    deleteFlight(data: UserDto): Promise<UserDto>;
}
