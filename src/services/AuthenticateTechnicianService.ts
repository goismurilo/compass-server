import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

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
            throw new Error('Incorrect email/password combination!');
        }

        const passwordMachted = await compare(password, technician.password);

        if (!passwordMachted) {
            throw new Error('Incorrect email/password combination!');
        }

        const token = sign({}, 'f5479c60a6a2511685c3613142b5cd59', {
            subject: technician.id,
            expiresIn: '1d',
        });

        return { technician, token };
    }
}

export default AuthenticateTechnicianService;
