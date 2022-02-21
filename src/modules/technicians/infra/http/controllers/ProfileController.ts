import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/technicians/services/UpdateProfileService';
import ShowProfileService from '@modules/technicians/services/ShowProfileService';

interface ITechnician {
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

export default class TechniciansController {
    public async show(request: Request, response: Response): Promise<Response> {
        const technician_id = request.technician.id;

        const showProfile = container.resolve(ShowProfileService);

        const technician = await showProfile.execute({
            technician_id
        });

        return response.json(technician);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const technician_id = request.technician.id;
        const { name, email, old_password, password } = request.body;

        const updateTechnician = container.resolve(UpdateProfileService);

        const technician: ITechnician = await updateTechnician.execute({
            technician_id,
            name,
            email,
            old_password,
            password,
        });

        delete technician.password;

        return response.json(technician);
    }
}
