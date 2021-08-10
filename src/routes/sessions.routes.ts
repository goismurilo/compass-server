import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateTechnicianService';

const sessionsRouter = Router();

interface Technician {
    email: string;
    password?: string;
}

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const technician: Technician = await authenticateUser.execute({
            email,
            password,
        });

        delete technician.password;

        return response.json(technician);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
