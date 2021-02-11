import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Vozilo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    registracija: string;
}