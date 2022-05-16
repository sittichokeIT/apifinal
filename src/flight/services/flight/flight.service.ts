/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightDto } from 'src/flight/dto/flight.dto/flight-dto';
import { Flight } from 'src/flight/entity/flight.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlightService {
    public flights: FlightDto[] = [];

    constructor(
        @InjectRepository(Flight)
        private flightRepo: Repository<Flight>
    ){}

    create(flights: FlightDto): Promise<FlightDto> {
        const addflight = this.flightRepo.save(flights)
        this.flightRepo.query("INSERT INTO `flight_seats`\
        VALUES (1, 'Empty', ?),\
        (2, 'Empty', ?),\
        (3, 'Empty', ?),\
        (4, 'Empty', ?),\
        (5, 'Empty', ?)",
        [flights.flight_id, flights.flight_id,flights.flight_id,
         flights.flight_id,flights.flight_id])
        return addflight
    }

    loadAll(): Promise<FlightDto[]> {
        return this.flightRepo.find()
    }

    async checkflight(data) {
        const flightid = await this.flightRepo.query("SELECT * FROM flight WHERE flight.departure = ? AND flight.from_ = ? AND flight.to_ = ?",
        [data.departure, data.from_, data.to_])
        console.log(flightid)
        if(flightid){
            const flightseat = await this.flightRepo.query("SELECT seat FROM flight_seats WHERE flight_id = ?",
            [flightid[0].flight_id])
            return [flightid, flightseat]
        }
    }
}
