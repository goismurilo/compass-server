import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';

import CreateTechnicianService from './CreateTechnicianService';

describe('CreateTechnicianService', () => {
    it('should be able to create a new technician', async () => {
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const fakeHashed = new FakeHashProvider();

        const createTechnician = new CreateTechnicianService(
            fakeTechniciansRepository,
            fakeHashed,
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
        const fakeHashed = new FakeHashProvider();

        const createTechnician = new CreateTechnicianService(
            fakeTechniciansRepository,
            fakeHashed,
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
