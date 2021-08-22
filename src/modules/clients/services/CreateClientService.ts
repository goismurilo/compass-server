import { getRepository } from 'typeorm';

import Client from '../infra/typeorm/entities/Client';

interface Request {
    name: string;
    email: string;
    cpf: string;
    rg: string;
    phone: string;
    cep: string;
    city: string;
    district: string;
    street: string;
    number: string;
    referencePoint: string;
}

class CreateClientService {
    public async execute({
        name,
        email,
        cpf,
        rg,
        phone,
        cep,
        city,
        district,
        street,
        number,
        referencePoint,
    }: Request): Promise<Client> {
        const clientsRepository = getRepository(Client);

        const checkClientExists = await clientsRepository.findOne({
            where: { email },
        });

        if (checkClientExists) {
            throw new Error('Email address alredy used.');
        }

        const client = clientsRepository.create({
            name,
            email,
            cpf,
            rg,
            phone,
            cep,
            city,
            district,
            street,
            number,
            referencePoint,
        });

        await clientsRepository.save(client);

        return client;
    }
}

export default CreateClientService;
