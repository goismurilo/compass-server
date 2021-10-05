import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';
import CreateTechnicianService from './CreateTechnicianService';

let fakeTechniciansRepository: FakeTechniciansRepository;
let fakeHashed: FakeHashProvider;
let createTechnician: CreateTechnicianService;

describe('CreateTechnicianService', () => {
    beforeEach(() => {
        fakeTechniciansRepository = new FakeTechniciansRepository();
        fakeHashed = new FakeHashProvider();

        createTechnician = new CreateTechnicianService(
            fakeTechniciansRepository,
            fakeHashed,
        );
    });
    it('should be able to create a new technician', async () => {
        const technician = await createTechnician.execute({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        expect(technician).toHaveProperty('id');
    });

    it('should be able to create a new technician with same email from another', async () => {
        await createTechnician.execute({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        await expect(
            createTechnician.execute({
                name: 'Cristovao',
                email: 'cristovao@gmail.com',
                password: 'cris123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
