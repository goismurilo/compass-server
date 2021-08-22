import { Router } from 'express';

import CreateServiceService from '@modules/servicesOS/services/CreateServiceService';

const serviceRouter = Router();

serviceRouter.post('/', async (request, response) => {
    const { name } = request.body;
    const createService = new CreateServiceService();

    const service = await createService.execute({
        name,
    });
    return response.json(service);
});

export default serviceRouter;
