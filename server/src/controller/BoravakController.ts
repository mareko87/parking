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
        const user = (request.session as any).user as User | undefined;
        if (!user || !user.odobren) {
            response.status(400);
            return '';

        }
        let vozilo = await this.voziloRepository.findOne({
            where: {
                registracija: request.body.vozilo.registracija
            }
        });

        if (!vozilo) {
            const insertResult = await this.voziloRepository.insert({ registracija: request.body.registracija });
            vozilo = await this.voziloRepository.findOne(insertResult.identifiers[0].id);
        }
        const parkiraliste = await this.parkiralisteRepository.findOne(request.body.parkiralisteId);
        const insertResult = await this.boravakRepository.insert({
            parkiraliste: parkiraliste,
            placen: false,
            vozilo: vozilo,
            vremeIzlaska: request.body.vremeUlaska,
            vremeUlaska: undefined
        });
        return insertResult.identifiers[0].id;
    }
    public async napusti(request: Request, response: Response, next: NextFunction) {
        const user = (request.session as any).user as User | undefined;
        if (!user || !user.odobren) {
            response.status(400);
            return '';

        }
        const boravak = await this.boravakRepository.find({
            where: {
                parkiraliste: {
                    id: request.body.parkiralisteId,
                },
                vozilo: {
                    id: request.body.voziloId
                }
            }
        });
        if (!boravak) {
            response.status(400);
            return '';
        }
        await this.boravakRepository.update({
            parkiraliste: {
                id: request.body.parkiralisteId,
            },
            vozilo: {
                id: request.body.voziloId
            }
        }, { vremeIzlaska: request.body.vremeIzlaska });
    }
}