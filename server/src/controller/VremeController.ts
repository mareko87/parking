import axios from "axios";
import { NextFunction, Request, Response } from "express";

export class VremeController {

    public async vreme(request: Request, response: Response, next: NextFunction) {
        return (await axios.get('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civillight&output=json')).data.dataseries[0];
    }
}