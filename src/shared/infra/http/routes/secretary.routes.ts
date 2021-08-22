import { Router } from 'express';

import CreateSecretaryService from '../../../../modules/secretaries/services/CreateSecretaryService';

const secretaryRouter = Router();

interface Secretary {
    name: string;
    email: string;
    password?: string;
}

secretaryRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const createSecretary = new CreateSecretaryService();

    const secretary: Secretary = await createSecretary.execute({
        name,
        email,
        password,
    });

    delete secretary.password;

    return response.json(secretary);
});

export default secretaryRouter;
