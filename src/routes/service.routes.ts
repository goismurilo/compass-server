import { Router } from 'express';

import CreateServiceService from '../services/CreateServiceService';

const serviceRouter = Router();

serviceRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;
        const createService = new CreateServiceService();

        const service = await createService.execute({
            name,
        });
        return response.json(service);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default serviceRouter;
