import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import Boravak from "../entity/Boravak";
import { User } from "../entity/User";
import Vozilo from "../entity/Vozilo";
import Parkiraliste from "../entity/Parkiraliste";


export class BoravakController {

    private boravakRepository = getRepository(Boravak);
    private voziloRepository = getRepository(Vozilo);
    private parkiralisteRepository = getRepository(Parkiraliste);
    public async all(request: Request, response: Response, next: NextFunction) {
        return await this.boravakRepository.find();
    }
    public async create(request: Request, response: Response, next: NextFunction) {
        const registracija = request.body.registracija;
        const vremeUlaska = new Date(request.body.vremeUlaska);
        const parkiralisteId = request.body.parkiralisteId;
        const user = (request.session as any).user as User | undefined;
        if (!user || !user.odobren) {
            response.status(400);
            return '';

        }
        let vozilo = await this.voziloRepository.findOne({
            where: {
                registracija: registracija
            }
        });

        if (!vozilo) {
            const insertResult = await this.voziloRepository.insert({ registracija: registracija });
            vozilo = await this.voziloRepository.findOne(insertResult.identifiers[0].id);
        }
        const parkiraliste = await this.parkiralisteRepository.findOne(parkiralisteId);
        const insertResult = await this.boravakRepository.insert({
            parkiraliste: parkiraliste,
            placen: false,
            vozilo: vozilo,
            racun: undefined,
            vremeIzlaska: undefined,
            vremeUlaska: vremeUlaska
        });
        return '';
    }
    public async napusti(request: Request, response: Response, next: NextFunction) {
        const parId = request.body.parkiralisteId;
        const registracija = request.body.registracija;
        console.log(parId);
        console.log(registracija);
        const user = (request.session as any).user as User | undefined;
        if (!user || !user.odobren) {
            response.status(400);
            return '';

        }
        let boravak = await this.boravakRepository.find({
            where: {
                parkiraliste: {
                    id: parId,
                }
            }
        });
        console.log(boravak);
        boravak = boravak.filter(element => element.vozilo.registracija === registracija);
        if (!boravak) {
            response.status(400);
            return '';
        }
        console.log('boravak');
        console.log(boravak);
        await this.boravakRepository.update({
            parkiraliste: {
                id: parId,
            },
            vozilo: {
                id: boravak[0].vozilo.id
            },
            vremeUlaska: boravak[0].vremeUlaska
        }, { ...boravak[0], vremeIzlaska: new Date(request.body.vremeIzlaska) });
        return '';
    }
}