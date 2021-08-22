import { getRepository } from 'typeorm';

import Service from '../infra/typeorm/entities/Service';

interface Request {
    name: string;
}

class CreateServiceService {
    public async execute({ name }: Request): Promise<Service> {
        const servicesRepository = getRepository(Service);

        const service = servicesRepository.create({
            name,
        });

        await servicesRepository.save(service);

        return service;
    }
}

export default CreateServiceService;
