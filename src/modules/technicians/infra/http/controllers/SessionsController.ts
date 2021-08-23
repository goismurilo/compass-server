import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateTechnicianService from '@modules/technicians/services/AuthenticateTechnicianService';

interface IRequest {
    email: string;
    password?: string;
}

interface IResponse {
    technician: IRequest;
    token: string;
}

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
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
    }
}
