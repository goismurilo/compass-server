import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';

import Technician from '../infra/typeorm/entities/Technician';

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
            throw new AppError('Email address alredy used.', 401);
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
