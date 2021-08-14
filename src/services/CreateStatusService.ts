import { getRepository } from 'typeorm';

import Status from '../models/Status';

interface Request {
    name: string;
}

class CreateStatusService {
    public async execute({ name }: Request): Promise<Status> {
        const statusRepository = getRepository(Status);

        const status = statusRepository.create({
            name,
        });

        await statusRepository.save(status);

        return status;
    }
}

export default CreateStatusService;