import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTechnicianService from '@modules/technicians/services/CreateTechnicianService';

interface ITechnician {
    name: string;
    email: string;
    password?: string;
}

export default class TechniciansController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;
        const createTechnician = container.resolve(CreateTechnicianService);

        const technician: ITechnician = await createTechnician.execute({
            name,
            email,
            password,
        });

        delete technician.password;

        return response.json(technician);
    }
}
