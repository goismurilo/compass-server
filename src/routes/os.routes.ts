import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import OServicesRepository from '../repositories/OServicesRepository';
import CreateOSService from '../services/CreateOSService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const osRouter = Router();

osRouter.use(ensureAuthenticated);

osRouter.get('/', async (request, response) => {
    const oServiceRepository = getCustomRepository(OServicesRepository);
    const oServices = await oServiceRepository.find();

    return response.json(oServices);
});

osRouter.post('/', async (request, response) => {
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
});

export default osRouter;
