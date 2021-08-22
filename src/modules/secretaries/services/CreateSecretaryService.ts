import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Secretary from '../entities/Secretary';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateSecretaryService {
    public async execute({
        name,
        email,
        password,
    }: Request): Promise<Secretary> {
        const secretariesRepository = getRepository(Secretary);

        const checkClientExists = await secretariesRepository.findOne({
            where: { email },
        });

        if (checkClientExists) {
            throw new Error('Email address alredy used.');
        }

        const hashedPassword = await hash(password, 8);

        const secretary = secretariesRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await secretariesRepository.save(secretary);

        return secretary;
    }
}

export default CreateSecretaryService;
