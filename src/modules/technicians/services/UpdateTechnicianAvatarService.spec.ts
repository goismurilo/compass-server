import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';
import UpdateTechnicianAvatarService from './UpdateTechnicianAvatarService';

describe('UpdateTechnicianAvatar', () => {
    it('should be able to create a new technician', async () => {
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const UpdateTechnicianAvatar = new UpdateTechnicianAvatarService(
            fakeTechniciansRepository,
            fakeStorageProvider,
        );

        const technician = await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        await UpdateTechnicianAvatar.execute({
            technicianId: technician.id,
            avatarFilename: 'technician.avatar',
        });

        expect(technician.avatar).toBe('technician.avatar');
    });

    it('should be able to update avatar from non existing technician', async () => {
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const UpdateTechnicianAvatar = new UpdateTechnicianAvatarService(
            fakeTechniciansRepository,
            fakeStorageProvider,
        );

        expect(
            UpdateTechnicianAvatar.execute({
                technicianId: 'technician.id',
                avatarFilename: 'technician.avatar',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avtar when updating new one', async () => {
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const UpdateTechnicianAvatar = new UpdateTechnicianAvatarService(
            fakeTechniciansRepository,
            fakeStorageProvider,
        );

        const technician = await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        await UpdateTechnicianAvatar.execute({
            technicianId: technician.id,
            avatarFilename: 'technician.avatar',
        });

        await UpdateTechnicianAvatar.execute({
            technicianId: technician.id,
            avatarFilename: 'technician.avatar2',
        });

        expect(deleteFile).toHaveBeenCalledWith('technician.avatar');

        expect(technician.avatar).toBe('technician.avatar2');
    });
});
