import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import Technician from '../models/Technician';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateTechnicianService {
    public async execute({
        name,
        email,
        password,
    }: Request): Promise<Technician> {
        const techniciansRepository = getRepository(Technician);

        const checkClientExists = await techniciansRepository.findOne({
            where: { email },
        });

        if (checkClientExists) {
            throw new Error('Email address alredy used.');
        }

        const hashedPassword = await hash(password, 8);

        const technician = techniciansRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await techniciansRepository.save(technician);

        return technician;
    }
}

export default CreateTechnicianService;
