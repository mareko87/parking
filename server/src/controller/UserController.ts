import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

const userDTO = (user: User) => {
    if (!user) {
        return '';
    }
    return {
        category: user.category?.value || "user",
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        username: user.username,
        odobren: user.odobren
    }
}
export class UserController {

    private userRepository = getRepository(User);

    async check(request: Request, response: Response, next: NextFunction) {
        const user = (request.session as any).user as User | undefined;

        if (!user || !user.odobren) {
            response.status(400);
            return '';

        }
        return userDTO(user);
    }

    async register(request: Request, response: Response, next: NextFunction) {
        const users = await this.userRepository.find({
            where: {
                username: request.body.username
            }
        })
        if (users.length > 0) {
            response.status(400)
            return '';
        }
        const insertResult = await this.userRepository.insert(request.body);
        return this.userRepository.findOne({
            where: {
                id: insertResult.identifiers[0].id
            }
        })
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne({
            where: {
                username: request.body.username,
                password: request.body.password
            }
        });
        if (!user || !user.odobren) {
            response.status(400);
            return '';
        }
        (request.session as any).user = user;

        return userDTO(user);
    }
    async verify(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne({
            where: {
                id: request.body.id
            }
        });
        if (!user) {
            response.status(400);
            return '';
        }
        await this.userRepository.update(user.id, { odobren: true });
        return '';
    }
    async logout(request: Request, response: Response, next: NextFunction) {
        request.session.destroy((err) => {
            response.status(500);
        })
        return '';
    }
    async all(request: Request, response: Response, next: NextFunction) {
        const user = (request.session as any).user as User | undefined;
        console.log(user);
        if (!user || !user.odobren) {
            response.status(400);
            return '';

        }
        return (await this.userRepository.find()).map(element => userDTO(element));
    }
}