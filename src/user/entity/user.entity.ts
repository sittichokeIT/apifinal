import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number

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
    arrival: string

    @Column({nullable: false})
    adults: number

    @Column({nullable: false})
    children: number

    @Column({nullable: false})
    infants: number
}
