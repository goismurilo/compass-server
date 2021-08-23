import { Router } from 'express';

import TechniciansRepository from '@modules/technicians/infra/typeorm/repositories/TechniciansRepository';
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
    const techniciansRepository = new TechniciansRepository();

    const { email, password } = request.body;

    const authenticateTechnician = new AuthenticateTechnicianService(
        techniciansRepository,
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
