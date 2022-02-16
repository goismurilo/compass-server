import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOSService from '@modules/orderServices/services/CreateOSService';
import OServicesRepository from '../../typeorm/repositories/OServicesRepository';

export default class OrderServicesController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const orderServicesRepository = container.resolve(OServicesRepository);

        const {
            clientIDFK,
            technicianIDFK,
            secretaryIDFK,
            serviceIDFK,
            obsSecretary,
            statusIDFK,
            isClosed,
        } = request.body;

        const createOS = new CreateOSService(orderServicesRepository);

        const oService = await createOS.execute({
            clientIDFK,
            technicianIDFK,
            statusIDFK,
            isClosed,
            secretaryIDFK,
            serviceIDFK,
            obsSecretary,
        });

        return response.json(oService);
    }
}
