import { Column, Entity, PrimaryColumn } from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class Flight {
    @PrimaryColumn()
    flight_id: string

    @Column({nullable: false})
    from_: string

    @Column({nullable: false})
    to_: string

    @Column({nullable: false})
    departure: string

    @Column({nullable: false})
    return: string
}
