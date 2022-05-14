import { Column, Entity, PrimaryColumn } from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class Flight {
    @PrimaryColumn()
    flight_id: number

    @Column({nullable: false})
    from: string

    @Column({nullable: false})
    to: string

    @Column({nullable: false})
    departure: string

    @Column({nullable: false})
    arrival: string
}
