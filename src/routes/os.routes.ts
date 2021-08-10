import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import OServicesRepository from '../repositories/OServicesRepository';
import CreateOSService from '../services/CreateOSService';

const osRouter = Router();

osRouter.get('/', async (request, response) => {
    const oServiceRepository = getCustomRepository(OServicesRepository);
    const oServices = await oServiceRepository.find();

    return response.json(oServices);
});

osRouter.post('/', async (request, response) => {
    try {
        const {
            clientIDFK,
            technicianIDFK,
            secretaryIDFK,
            serviceIDFK,
            obsSecretary,
            statusIDFK,
            isClosed,
        } = request.body;

        const createOS = new CreateOSService();

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
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default osRouter;
