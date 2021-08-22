import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CreateTechnicianService from '@modules/technicians/services/CreateTechnicianService';
import UpdateTechnicianAvatarService from '@modules/technicians/services/UpdateTechnicianAvatarService';

import ensureAuthenticated from '@modules/technicians/infra/http/middlewares/ensureAuthenticated';

const technicianRouter = Router();
const upload = multer(uploadConfig);

interface Technician {
    name: string;
    email: string;
    password?: string;
}

technicianRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createTechnician = new CreateTechnicianService();

        const technician: Technician = await createTechnician.execute({
            name,
            email,
            password,
        });

        delete technician.password;

        return response.json(technician);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

technicianRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateTechnicianAvatar = new UpdateTechnicianAvatarService();

        const technician: Technician = await updateTechnicianAvatar.execute({
            technicianId: request.technician.id,
            avatarFilename: request.file?.filename,
        });

        delete technician.password;

        return response.json(technician);
    },
);

export default technicianRouter;
