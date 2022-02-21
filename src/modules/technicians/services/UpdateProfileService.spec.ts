import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeTechniciansRepository: FakeTechniciansRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
    beforeEach(() => {
        fakeTechniciansRepository = new FakeTechniciansRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeTechniciansRepository,
            fakeHashProvider,
        );
    });
    it('should be able to update the profile', async () => {
        const technician = await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        const updateTechnician = await updateProfile.execute({
            technician_id: technician.id,
            name: 'Pedro Alvares',
            email: 'pedroalvares@example.com',
        });

        expect(updateTechnician.name).toBe('Pedro Alvares');
        expect(updateTechnician.email).toBe('pedroalvares@example.com');
    });

    it('should not be able to change to another user email', async () => {
        await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@example.com',
            password: 'cris123',
        });

        const technician = await fakeTechniciansRepository.create({
            name: 'Vasco Da Gama',
            email: 'vascodagama@gmail.com',
            password: 'cruzmaltino',
        });

        await expect(
            updateProfile.execute({
                technician_id: technician.id,
                name: 'Cristovao',
                email: 'cristovao@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const technician = await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: '3Marias',
        });

        const updateTechnician = await updateProfile.execute({
            technician_id: technician.id,
            name: 'Pedro Alvares',
            email: 'pedroalvares@example.com',
            old_password: '3Marias',
            password: 'cris123',
        });

        expect(updateTechnician.password).toBe('cris123');
    });

    it('should not be able to update the password without old password', async () => {
        const technician = await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: '3Marias',
        });

        await expect(
            updateProfile.execute({
                technician_id: technician.id,
                name: 'Pedro Alvares',
                email: 'pedroalvares@example.com',
                password: 'cris123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password without wrong old password', async () => {
        const technician = await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: '3Marias',
        });

        await expect(
            updateProfile.execute({
                technician_id: technician.id,
                name: 'Pedro Alvares',
                email: 'pedroalvares@example.com',
                old_password: 'senha-antiga-errada',
                password: 'cris123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
