import OService from '@modules/orderServices/infra/typeorm/entities/OService';
import IOServicesRepository from '../repositories/IOServicesRepository';

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
    // eslint-disable-next-line prettier/prettier
    constructor(private orderServicesRepository: IOServicesRepository) { }

    public async execute({
        clientIDFK,
        technicianIDFK,
        secretaryIDFK,
        serviceIDFK,
        obsSecretary,
        statusIDFK,
        isClosed,
    }: IRequest): Promise<OService> {
        const oService = await this.orderServicesRepository.create({
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
