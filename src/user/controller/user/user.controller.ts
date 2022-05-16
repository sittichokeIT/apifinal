/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto/user-dto';
import { UserService } from 'src/user/services/user/user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    create(@Body() user: UserDto){
        return this.userService.create(user)
    }

    @Get()
    loadAll(): Promise<UserDto[]>{
        return this.userService.loadAll()
    }

    @Post("updateTime")
    async updateTime(@Body() data: UserDto){
        if(data){
            return this.userService.updateTime(data)
        }
    }

    @Post("deleteFlight")
    async deleteFlight(@Body() data: UserDto){
        if(data){
            return this.userService.deleteflight(data)
        }
    }

}
