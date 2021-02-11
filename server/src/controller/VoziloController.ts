import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import Vozilo from "../entity/Vozilo";


export class VoziloController {

    private voziloRepository = getRepository(Vozilo);

    public async all(request: Request, response: Response, next: NextFunction) {
        return await this.voziloRepository.find();
    }


}