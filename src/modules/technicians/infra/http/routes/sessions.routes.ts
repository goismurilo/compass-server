import { Router } from 'express';

import { container } from 'tsyringe';

import AuthenticateTechnicianService from '@modules/technicians/services/AuthenticateTechnicianService';

const sessionsRouter = Router();

interface IRequest {
    email: string;
    password?: string;
}

interface IResponse {
    technician: IRequest;
    token: string;
}

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateTechnician = container.resolve(
        AuthenticateTechnicianService,
    );

    const { technician, token }: IResponse =
        await authenticateTechnician.execute({
            email,
            password,
        });

    delete technician.password;

    return response.json({ technician, token });
});

export default sessionsRouter;
