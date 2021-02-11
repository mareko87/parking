import { Entity, Column, ManyToOne } from "typeorm";
import Parkiraliste from "./Parkiraliste";
import Racun from "./Racun";
import Vozilo from "./Vozilo";

@Entity()
export default class Boravak {


    @Column()
    vremeUlaska: Date
    @Column()
    vremeIzlaska: Date | undefined


    @Column()
    placen: boolean

    @ManyToOne(type => Parkiraliste, { eager: true, primary: true, onDelete: 'CASCADE' })
    parkiraliste: Parkiraliste

    @ManyToOne(type => Vozilo, { eager: true, primary: true })
    vozilo: Vozilo

    @ManyToOne(type => Racun)
    racun?: Racun;
}