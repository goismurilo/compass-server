import { Router } from 'express';

import CreateSecretaryService from '../services/CreateSecretaryService';

const secretaryRouter = Router();

interface Secretary {
    name: string;
    email: string;
    password?: string;
}
secretaryRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createSecretary = new CreateSecretaryService();

        const secretary: Secretary = await createSecretary.execute({
            name,
            email,
            password,
        });

        delete secretary.password;

        return response.json(secretary);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default secretaryRouter;
