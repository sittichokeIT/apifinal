/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class FlightDto {
    @IsString()
    from: string

    @IsString()
    to: string

    @IsString()
    departure: string

    @IsString()
    arrival: string
}
