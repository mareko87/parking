import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Boravak from "./Boravak";

@Entity()
export default class Parkiraliste {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naziv: string;

    @Column()
    adresa: string;

    @Column()
    kapacitet: number;

    @Column()
    cenaSata: number

    @OneToMany(type => Boravak, bor => bor.parkiraliste, { eager: false })
    boravci: Boravak[]
}