import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import OServicesRepository from '@modules/servicesOS/repositories/OServicesRepository';
import ensureAuthenticated from '@modules/technicians/infra/http/middlewares/ensureAuthenticated';
import CreateOSService from '@modules/orderServices/services/CreateOSService';

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
