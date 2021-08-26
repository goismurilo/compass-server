import AppError from '@shared/errors/AppError';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateTechnicianService from './CreateTechnicianService';

import AuthenticateTechnicianService from './AuthenticateTechnicianService';

describe('AuthenticateTechnicianService', () => {
    it('should be able to authenticate', async () => {
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createTechnician = new CreateTechnicianService(
            fakeTechniciansRepository,
            fakeHashProvider,
        );

        const authenticateTechnician = new AuthenticateTechnicianService(
            fakeTechniciansRepository,
            fakeHashProvider,
        );

        const technician = await createTechnician.execute({
            name: 'Paulo Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        const response = await authenticateTechnician.execute({
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        expect(response).toHaveProperty('token');
        expect(response.technician).toEqual(technician);
    });

    it('should not be able to authenticate with not existing technician', async () => {
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateTechnician = new AuthenticateTechnicianService(
            fakeTechniciansRepository,
            fakeHashProvider,
        );

        expect(
            authenticateTechnician.execute({
                email: 'cristovao@gmail.com',
                password: 'cris123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createTechnician = new CreateTechnicianService(
            fakeTechniciansRepository,
            fakeHashProvider,
        );

        const authenticateTechnician = new AuthenticateTechnicianService(
            fakeTechniciansRepository,
            fakeHashProvider,
        );

        await createTechnician.execute({
            name: 'Paulo Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        expect(
            authenticateTechnician.execute({
                email: 'cristovao@gmail.com',
                password: '14421424',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
