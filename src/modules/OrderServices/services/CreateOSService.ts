import { getCustomRepository } from 'typeorm';

import OService from '@modules/orderServices/infra/typeorm/entities/OService';
import OServicesRepository from '@modules/orderServices/infra/typeorm/repositories/OServicesRepository';

interface IRequest {
    clientIDFK: string;
    technicianIDFK: string;
    secretaryIDFK: string;
    serviceIDFK: string;

    obsSecretary: string;

    statusIDFK: string;
    isClosed: boolean;
}

class CreateOSService {
    public async execute({
        clientIDFK,
        technicianIDFK,
        secretaryIDFK,
        serviceIDFK,
        obsSecretary,
        statusIDFK,
        isClosed,
    }: IRequest): Promise<OService> {
        const oServiceRepository = getCustomRepository(OServicesRepository);

        const oService = await oServiceRepository.create({
            clientIDFK,
            technicianIDFK,
            secretaryIDFK,
            serviceIDFK,
            obsSecretary,
            statusIDFK,
            isClosed,
        });

        return oService;
    }
}

export default CreateOSService;
