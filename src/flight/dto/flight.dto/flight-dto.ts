/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class FlightDto {
    @IsString()
    flight_id: string;

    @IsString()
    from_: string

    @IsString()
    to_: string

    @IsString()
    departure: string

    @IsString()
    return: string
}
