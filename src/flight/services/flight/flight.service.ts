/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightDto } from 'src/flight/dto/flight.dto/flight-dto';
import { Flight } from 'src/flight/entity/flight.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlightService {
    public flights: FlightDto[] = []; //

    constructor(
        @InjectRepository(Flight)
        private flightRepo: Repository<Flight>
    ){}

    create(flights: FlightDto): Promise<FlightDto> {
        return this.flightRepo.save(flights)
    }

    loadAll(): Promise<FlightDto[]> {
        return this.flightRepo.find()
    }
}
