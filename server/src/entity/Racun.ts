import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Parkiraliste from "./Parkiraliste";
import { User } from "./User";
import Vozilo from "./Vozilo";

@Entity()
export default class Racun {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    datumKreiranja: Date;

    @Column()
    iznos: number



    @ManyToOne(type => User, { eager: true })
    user: User
}