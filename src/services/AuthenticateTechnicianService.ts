import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import Technician from '../models/Technician';

interface Request {
    email: string;
    password?: string;
}

interface Response {
    technician: Technician;
    token: string;
}

class AuthenticateTechnicianService {
    public async execute({ email, password }: Request): Promise<Response> {
        const technicianRepository = getRepository(Technician);

        const technician = await technicianRepository.findOne({
            where: { email },
        });

        if (!technician || !password) {
            throw new AppError('Incorrect email/password combination!', 401);
        }

        const passwordMachted = await compare(password, technician.password);

        if (!passwordMachted) {
            throw new AppError('Incorrect email/password combination!', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: technician.id,
            expiresIn,
        });

        return { technician, token };
    }
}

export default AuthenticateTechnicianService;
