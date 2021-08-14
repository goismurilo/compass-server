import { Router } from 'express';

import CreateClientService from '../services/CreateClientService';

const clientRouter = Router();

clientRouter.post('/', async (request, response) => {
    try {
        const {
            name,
            email,
            cpf,
            rg,
            phone,
            cep,
            city,
            district,
            street,
            number,
            referencePoint,
        } = request.body;
        const createClient = new CreateClientService();

        const client = await createClient.execute({
            name,
            email,
            cpf,
            rg,
            phone,
            cep,
            city,
            district,
            street,
            number,
            referencePoint,
        });
        return response.json(client);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default clientRouter;