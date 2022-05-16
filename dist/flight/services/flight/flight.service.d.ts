import { FlightDto } from 'src/flight/dto/flight.dto/flight-dto';
import { Flight } from 'src/flight/entity/flight.entity';
import { Repository } from 'typeorm';
export declare class FlightService {
    private flightRepo;
    flights: FlightDto[];
    constructor(flightRepo: Repository<Flight>);
    create(flights: FlightDto): Promise<FlightDto>;
    loadAll(): Promise<FlightDto[]>;
    checkflight(data: any): Promise<any[]>;
}
