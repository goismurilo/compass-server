import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateTechnicianService from '../services/CreateTechnicianService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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
        return response.json({ ok: true });
    },
);

export default technicianRouter;
