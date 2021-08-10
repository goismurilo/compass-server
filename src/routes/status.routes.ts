import { Router } from 'express';

import CreateStatusService from '../services/CreateStatusService';

const statusRouter = Router();

statusRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;
        const createStatus = new CreateStatusService();

        const status = await createStatus.execute({
            name,
        });
        return response.json(status);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default statusRouter;
