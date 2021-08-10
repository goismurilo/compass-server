import { Router } from 'express';

import AuthenticateTechnicianService from '../services/AuthenticateTechnicianService';

const sessionsRouter = Router();

interface Request {
    email: string;
    password?: string;
}

interface Response {
    technician: Request;
    token: string;
}

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateTechnician = new AuthenticateTechnicianService();

        const { technician, token }: Response =
            await authenticateTechnician.execute({
                email,
                password,
            });

        delete technician.password;

        return response.json({ technician, token });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
