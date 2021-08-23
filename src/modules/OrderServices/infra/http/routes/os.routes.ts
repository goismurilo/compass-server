import { Router } from 'express';

import OServicesRepository from '@modules/orderServices/infra/typeorm/repositories/OServicesRepository';
import ensureAuthenticated from '@modules/technicians/infra/http/middlewares/ensureAuthenticated';
import CreateOSService from '@modules/orderServices/services/CreateOSService';

const osRouter = Router();
const orderServicesRepository = new OServicesRepository();

osRouter.use(ensureAuthenticated);

// osRouter.get('/', async (request, response) => {
//     const oServices = await orderServicesRepository.find();

//     return response.json(oServices);
// });

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
});

export default osRouter;
