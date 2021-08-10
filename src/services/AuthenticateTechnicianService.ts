import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

import Technician from '../models/Technician';

interface Request {
    email: string;
    password?: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Technician> {
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
        return technician;
    }
}

export default AuthenticateUserService;
