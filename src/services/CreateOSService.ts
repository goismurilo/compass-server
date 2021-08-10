import { getCustomRepository } from 'typeorm';
import OService from '../models/OService';
import OServicesRepository from '../repositories/OServicesRepository';

interface Request {
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
    }: Request): Promise<OService> {
        const oServiceRepository = getCustomRepository(OServicesRepository);

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
