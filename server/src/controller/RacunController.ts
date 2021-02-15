import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import Racun from "../entity/Racun";
import { User } from "../entity/User";
import Boravak from "../entity/Boravak";


export class RacunController {

    private racunRepository = getRepository(Racun);
    private boravakRepository = getRepository(Boravak);
    public async all(request: Request, response: Response, next: NextFunction) {
        return await this.racunRepository.find();
    }
    public async one(request: Request, response: Response, next: NextFunction) {
        return await this.racunRepository.findOne(request.params.id);
    }
    public async create(request: Request, response: Response, next: NextFunction) {
        const user = (request.session as any).user as User | undefined;
        if (!user || !user.odobren) {
            response.status(400);
            return '';

        }
        const { boravci, ...rest } = request.body;
        const insertResult = await this.racunRepository.insert({ ...rest, user: user });
        const racun = await insertResult.identifiers[0].id;
        for (let boravak of boravci) {
            await this.boravakRepository.update(boravak, { placen: true, racun: racun });
        }
        return racun
    }

}