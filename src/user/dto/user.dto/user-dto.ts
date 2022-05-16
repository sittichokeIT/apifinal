/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsString()
    user_id: string
    
    @IsString()
    fullName: string

    @IsString()
    from: string

    @IsString()
    to: string

    @IsString()
    triptype: string

    @IsString()
    departure: string

    @IsString()
    return: string

    @IsNumber()
    adults: number

    @IsNumber()
    children: number

    @IsNumber()
    infants: number

    @IsString()
    flight_id: string
}
