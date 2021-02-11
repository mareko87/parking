import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import * as cors from 'cors';
import * as session from 'express-session'

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors({
        credentials: true,//protiv xss napada

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        origin: 'http://localhost:3000'

    }));
    app.use(bodyParser.json());
    app.use(session({
        secret: 'adsfgdhtyjtiuyi',
        resave: false,

        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: 1000 * 60 * 10,//10min
            httpOnly: true,
        }

    }))
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.json(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(5000, () => {
        console.log('server is listening');
    });

    // insert new users for test


}).catch(error => console.log(error));
