import { Router } from 'express';

import CreateClientService from '../../modules/clients/services/CreateClientService';

const clientRouter = Router();

clientRouter.post('/', async (request, response) => {
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
});

export default clientRouter;
