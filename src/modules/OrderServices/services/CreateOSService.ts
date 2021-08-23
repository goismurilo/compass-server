import { getRepository } from 'typeorm';

import OService from '@modules/orderServices/infra/typeorm/entities/OService';

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
        const oServiceRepository = getRepository(OService);

        const oService = oServiceRepository.create({
            clientIDFK,
            technicianIDFK,
            secretaryIDFK,
            serviceIDFK,
            obsSecretary,
            statusIDFK,
            isClosed,
        });

        await oServiceRepository.save(oService);

        return oService;
    }
}

export default CreateOSService;
