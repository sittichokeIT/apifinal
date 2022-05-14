/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class UserDto {
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
    arrival: string

    @IsNumber()
    adults: number

    @IsNumber()
    children: number

    @IsNumber()
    infants: number
}
