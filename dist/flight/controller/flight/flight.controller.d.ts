import { FlightDto } from 'src/flight/dto/flight.dto/flight-dto';
import { FlightService } from 'src/flight/services/flight/flight.service';
export declare class FlightController {
    private flightService;
    constructor(flightService: FlightService);
    create(flight: FlightDto): Promise<FlightDto>;
    loadAll(): Promise<FlightDto[]>;
    checkflight(data: any): Promise<any[]>;
}
