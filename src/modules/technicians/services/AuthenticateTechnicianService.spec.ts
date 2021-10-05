import AppError from '@shared/errors/AppError';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateTechnicianService from './CreateTechnicianService';

import AuthenticateTechnicianService from './AuthenticateTechnicianService';

let fakeTechniciansRepository: FakeTechniciansRepository;
let fakeHashProvider: FakeHashProvider;
let createTechnician: CreateTechnicianService;
let authenticateTechnician: AuthenticateTechnicianService;

describe('AuthenticateTechnicianService', () => {
    beforeEach(() => {
        fakeTechniciansRepository = new FakeTechniciansRepository();
        fakeHashProvider = new FakeHashProvider();

        createTechnician = new CreateTechnicianService(
            fakeTechniciansRepository,
            fakeHashProvider,
        );

        authenticateTechnician = new AuthenticateTechnicianService(
            fakeTechniciansRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate', async () => {
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
        await expect(
            authenticateTechnician.execute({
                email: 'cristovao@gmail.com',
                password: 'cris123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await createTechnician.execute({
            name: 'Paulo Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        await expect(
            authenticateTechnician.execute({
                email: 'cristovao@gmail.com',
                password: '14421424',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
