import AppError from '@shared/errors/AppError';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';

import CreateTechnicianService from './CreateTechnicianService';

describe('CreateTechnicianService', () => {
    it('should be able to create a new technician', async () => {
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const createTechnician = new CreateTechnicianService(
            fakeTechniciansRepository,
        );

        const technician = await createTechnician.execute({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        expect(technician).toHaveProperty('id');
    });

    it('should be able to create a new technician with same email from another', async () => {
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const createTechnician = new CreateTechnicianService(
            fakeTechniciansRepository,
        );

        await createTechnician.execute({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        expect(
            createTechnician.execute({
                name: 'Cristovao',
                email: 'cristovao@gmail.com',
                password: 'cris123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
