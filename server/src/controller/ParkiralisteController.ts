import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import Parkiraliste from "../entity/Parkiraliste";
import { User } from "../entity/User";


export class ParkiralisteController {

    private parkiralisteRepository = getRepository(Parkiraliste);

    public async all(request: Request, response: Response, next: NextFunction) {
        return await this.parkiralisteRepository.find();
    }
    public async create(request: Request, response: Response, next: NextFunction) {
        const user = (request.session as any).user as User | undefined;
        if (!user) {
            response.status(400);
            return 'korisnik ne postoji';

        }
        if (!user.odobren) {
            response.status(400);
            return ' korisnik nije odobren';
        }
        const insertResult = await this.parkiralisteRepository.insert(request.body);
        return insertResult.identifiers[0].id;
    }
    public async update(request: Request, response: Response, next: NextFunction) {
        const user = (request.session as any).user as User | undefined;
        if (!user) {
            response.status(400);
            return 'korisnik ne postoji';

        }
        if (!user.odobren) {
            response.status(400);
            return ' korisnik nije odobren';
        }
        const parkiraliste = this.parkiralisteRepository.findOne(request.params.id);
        if (!parkiraliste) {
            response.status(400);
            return '';
        }
        await this.parkiralisteRepository.update(request.params.id, { ...request.body });
        return ''
    }
    public async delete(request: Request, response: Response, next: NextFunction) {
        const user = (request.session as any).user as User | undefined;
        if (!user || !user.odobren) {
            response.status(400);
            return '';

        }
        const parkiraliste = this.parkiralisteRepository.findOne(request.params.id);
        if (!parkiraliste) {
            response.status(400);
            return '';
        }
        await this.parkiralisteRepository.delete(request.params.id);
        return ''
    }
}