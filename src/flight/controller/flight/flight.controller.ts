/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { FlightDto } from 'src/flight/dto/flight.dto/flight-dto';
import { FlightService } from 'src/flight/services/flight/flight.service';

@Controller('flight')
export class FlightController {
    constructor(private flightService: FlightService){}

    @Post()
    create(@Body() flight: FlightDto): Promise<FlightDto>{
        return this.flightService.create(flight);
    }

    @Get()
    loadAll(): Promise<FlightDto[]>{
        return this.flightService.loadAll()
    }
}
