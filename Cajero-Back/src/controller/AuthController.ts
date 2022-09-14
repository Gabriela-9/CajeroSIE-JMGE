import { getRepository } from "typeorm";
import { Request, Response } from "express";
import config from "./../config/config";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { Usuarios } from "../entity/usuario";
import { request } from "http";

class AuthController {

    static login = async (request: Request, response: Response) => {

        const { no_identificacion, password } = request.body;
        if (!(no_identificacion && password)) {
            return response.status(400).json({ message: 'Identification or password incorrect!' })
        }

        const userRepository = getRepository(Usuarios);
        let user: Usuarios;

        try {
            user = await userRepository.findOneOrFail({ where: { no_identificacion } })
        } catch {
            return response.status(400).json({ message: 'Identification or password incorrect!' })
        }

        if (!user.checkPassword(password))
            return response.status(400).json({ message: 'Identification or password incorrect!' })

        const token = jwt.sign({ user_no_identificacion: user.no_identificacion, user_id: user.id_usuarios}, config.jwtSecret, { expiresIn: '1h' });
        return response.send({
            message:'OK',
            user_id: user.id_usuarios,
            token: token
        });
    }


    static register = async (request: Request, response: Response) => {
        const userRepository = getRepository(Usuarios);
        const { nombres,apellidos,no_identificacion,tp_identificacion, password } = request.body;

        let user: Usuarios = new Usuarios();

        user.nombres = nombres;
        user.apellidos = apellidos;
        user.no_identificacion = no_identificacion;
        user.tp_identificacion = tp_identificacion;
        user.password = password;


        //Validate
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(user, validationOpt);
        if (errors.length > 0) {
            response.status(400).json(errors);
        }

        try {
            user.hashPassword();
            user = await userRepository.save(user);
        } catch (error) {
            return response.status(409).json(error)
        }

        user.password = null;

        const token = jwt.sign({ user_no_identificacion: user.no_identificacion, user_id: user.id_usuarios}, config.jwtSecret, { expiresIn: '1h' });
        return response.send({
            message:'OK',
            user_id: user.id_usuarios,
            nombres : user.nombres,
            apellidos : user.apellidos,
            no_identificacion : user.no_identificacion,
            tp_identificacion : user.tp_identificacion,
            token: token
        });
    };
}

export default AuthController;