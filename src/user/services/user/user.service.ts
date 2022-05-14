/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto/user-dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    public users: UserDto[] = [];

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}

    create(users: UserDto): Promise<UserDto> {
        return this.userRepo.save(users)
    }

    loadAll(): Promise<UserDto[]> {
        return this.userRepo.find()
    }
}
