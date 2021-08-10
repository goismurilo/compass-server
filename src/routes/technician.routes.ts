import { Router } from 'express';

import CreateTechnicianService from '../services/CreateTechnicianService';

const technicianRouter = Router();

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

export default technicianRouter;
