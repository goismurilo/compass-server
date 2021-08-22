import { Router } from 'express';

import CreateStatusService from '@modules/statusOS/services/CreateStatusService';

const statusRouter = Router();

statusRouter.post('/', async (request, response) => {
    const { name } = request.body;
    const createStatus = new CreateStatusService();

    const status = await createStatus.execute({
        name,
    });
    return response.json(status);
});

export default statusRouter;
