import { Entity, Column, ManyToOne } from "typeorm";
import Parkiraliste from "./Parkiraliste";
import Racun from "./Racun";
import Vozilo from "./Vozilo";

@Entity()
export default class Boravak {


    @Column({ primary: true })
    vremeUlaska: Date
    @Column({ nullable: true })
    vremeIzlaska: Date | undefined


    @Column()
    placen: boolean

    @ManyToOne(type => Parkiraliste, p => p.boravci, { eager: true, primary: true, onDelete: 'CASCADE' })
    parkiraliste: Parkiraliste

    @ManyToOne(type => Vozilo, { eager: true, primary: true })
    vozilo: Vozilo

    @ManyToOne(type => Racun, { eager: true, nullable: true })
    racun?: Racun;
}