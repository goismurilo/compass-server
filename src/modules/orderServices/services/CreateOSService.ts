/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';

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

@injectable()
class CreateOSService {
    constructor(
        @inject('OServicesRepository')
        private orderServicesRepository: IOServicesRepository,
    ) { }

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
