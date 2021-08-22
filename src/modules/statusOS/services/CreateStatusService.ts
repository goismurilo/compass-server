import { getRepository } from 'typeorm';

import Status from '@modules/statusOS/infra/typeorm/entities/Status';

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
