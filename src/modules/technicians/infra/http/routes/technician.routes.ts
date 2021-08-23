import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import CreateTechnicianService from '@modules/technicians/services/CreateTechnicianService';
import UpdateTechnicianAvatarService from '@modules/technicians/services/UpdateTechnicianAvatarService';

import ensureAuthenticated from '@modules/technicians/infra/http/middlewares/ensureAuthenticated';

const technicianRouter = Router();
const upload = multer(uploadConfig);

interface ITechnician {
    name: string;
    email: string;
    password?: string;
}

technicianRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const createTechnician = container.resolve(CreateTechnicianService);

    const technician: ITechnician = await createTechnician.execute({
        name,
        email,
        password,
    });

    delete technician.password;

    return response.json(technician);
});

technicianRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateTechnicianAvatar = container.resolve(
            UpdateTechnicianAvatarService,
        );

        const technician: ITechnician = await updateTechnicianAvatar.execute({
            technicianId: request.technician.id,
            avatarFilename: request.file?.filename,
        });

        delete technician.password;

        return response.json(technician);
    },
);

export default technicianRouter;
