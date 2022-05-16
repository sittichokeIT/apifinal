import { Column, Entity, PrimaryColumn } from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class User {
    @PrimaryColumn()
    user_id: string

    @Column({nullable: false})
    fullName: string

    @Column({nullable: false})
    from: string

    @Column({nullable: false})
    to: string

    @Column({nullable: false})
    triptype: string

    @Column({nullable: false})
    departure: string

    @Column({nullable: false})
    return: string

    @Column({nullable: false})
    adults: number

    @Column({nullable: false})
    children: number

    @Column({nullable: false})
    infants: number

    @Column({nullable: false})
    flight_id: string
}
