import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as cors from 'cors';
import * as session from 'express-session'
import * as https from 'https'
import * as path from 'path'
import * as fs from 'fs'

createConnection().then(async connection => {
    const key = fs.readFileSync('./key.pem', 'utf8');
    const cert = fs.readFileSync('./cert.pem', 'utf8');
    // create express app
    const app = express();
    app.use(cors({
        credentials: true,//protiv xss napada

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        origin: 'http://localhost:3000'

    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'adsfgdhtyjtiuyi',
        resave: false,

        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: 1000 * 60 * 10,//10min
            httpOnly: true,
            sameSite: "none"
        }

    }))

    app.use((rec, res, next) => {
        console.log(rec.session);
        next();
    })
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
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    // setup express app here
    // ...

    // start express server
    const server = https.createServer({
        key: key,
        cert: cert,
    }, app)
    server.listen(process.env.PORT || 5000, () => console.log('app is listening'))

    // insert new users for test


}).catch(error => console.log(error));
