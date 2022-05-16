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

    async create(users: UserDto){
        //รับค่าจาก flight_id ที่ user กรอก
        const result = await this.userRepo.query("SELECT * FROM `flight` WHERE `flight_id` = ? LIMIT 1", 
        [users.flight_id])
        if(result[0]){
            const find_seat = await this.userRepo.query("SELECT * FROM `flight_seats` WHERE `flight_id` = ?",
            [result[0].flight_id])
            //หาที่ว่างใน flight_seats
            if(find_seat[0]){
                for(let i=0; i<5; i++){
                    if(find_seat[i].seat === 'Empty'){
                        //update การจองที่นั่ง
                        await this.userRepo.query("UPDATE `flight_seats` SET `seat` = ? WHERE `id` = ? AND `flight_id` = ?",
                        [users.user_id, find_seat[i].id, users.flight_id])

                        //one way
                        if(users.triptype === 'oneway'){
                            users.return = 'NULL'
                        }
                        else if(users.triptype === 'return'){
                            const find_return_flight = await this.userRepo.query("SELECT * FROM `flight` WHERE `flight_id` = ?",
                            [users.flight_id])
                            if(find_return_flight){
                                users.return = find_return_flight[0].return
                            }
                        }

                        this.userRepo.save(users)
                        return JSON.stringify({ flight_id: users.flight_id, seat_id: find_seat[i].id, user_id: users.user_id })
                    }
                }
            }
        }
        return 
    }

    loadAll(): Promise<UserDto[]> {
        return this.userRepo.find()
    }

    async updateTime(users: UserDto){
        const isFlightEmpty = this.userRepo.query("SELECT * FROM `flight` WHERE `flight_id` = ? LIMIT 1",
        [users.flight_id])
        if(isFlightEmpty){
            const findSeat = await this.userRepo.query("SELECT * FROM `flight_seats` WHERE `flight_id` = ?",
            [users.flight_id])
            if(findSeat){   
                for(let i=0; i<10; i++){
                    if(findSeat[i].seat === 'Empty'){
                        //เก็บobject ที่ตรงกับ user_id
                        const findUserFlightID = await this.userRepo.query("SELECT * FROM `user` WHERE `user_id` = ?",
                        [users.user_id])
                        if(findUserFlightID){
                            //เปลี่ยนที่นั่งเก่าให้ empty
                            await this.userRepo.query("UPDATE `flight_seats` SET `seat` = 'Empty' WHERE `seat` = ? AND `flight_id` = ?",
                            [users.user_id, findUserFlightID[0].flight_id])
                            //จองที่นั่งใหม่
                            await this.userRepo.query("UPDATE `flight_seats` SET `seat` = ? WHERE `id` = ? AND `flight_id` = ?",
                            [users.user_id, findSeat[i].id, users.flight_id])
                            //update ที่นั่งใน user
                            await this.userRepo.query("UPDATE `user` SET `flight_id` = ?, `departure` = ?, `return` = ? WHERE `user_id` = ?",
                            [users.flight_id, users.departure, users.return, users.user_id])
                            return JSON.stringify({ flight_id: users.flight_id, seat_id: findSeat[i].id, user_id: users.user_id })
                        }
                    }
                } 
            }
        }
    }

    async deleteflight(users: UserDto): Promise<UserDto>{
        const findUser = await this.userRepo.findOne({
            user_id: users.user_id
        })
        if(findUser){
            //เก็บ object ที่นั่ง จาก flight_id
            const findflightseat = await this.userRepo.query("SELECT * FROM `flight_seats` WHERE `seat` = ? AND `flight_id` = ?",
            [users.user_id, findUser.flight_id])
            if(findflightseat){
                //update ที่นั่งให้ empty
                await this.userRepo.query("UPDATE `flight_seats` SET `seat` = 'Empty' WHERE `seat` = ? AND `flight_id` = ?",
                [users.user_id, findUser.flight_id])
                return await this.userRepo.remove(findUser)
            }   
        }
    }
}
