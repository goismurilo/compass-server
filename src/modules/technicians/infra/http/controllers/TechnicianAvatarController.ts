import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateTechnicianAvatarService from '@modules/technicians/services/UpdateTechnicianAvatarService';

interface ITechnician {
    name: string;
    email: string;
    password?: string;
}

export default class TechnicianAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateTechnicianAvatar = container.resolve(
            UpdateTechnicianAvatarService,
        );

        const technician: ITechnician = await updateTechnicianAvatar.execute({
            technicianId: request.technician.id,
            avatarFilename: request.file?.filename,
        });

        delete technician.password;

        return response.json(technician);
    }
}
