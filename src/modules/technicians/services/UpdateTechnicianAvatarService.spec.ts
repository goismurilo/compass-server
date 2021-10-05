import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';
import UpdateTechnicianAvatarService from './UpdateTechnicianAvatarService';

let fakeTechniciansRepository: FakeTechniciansRepository;
let fakeStorageProvider: FakeStorageProvider;
let UpdateTechnicianAvatar: UpdateTechnicianAvatarService;

describe('UpdateTechnicianAvatar', () => {
    beforeEach(() => {
        fakeTechniciansRepository = new FakeTechniciansRepository();
        fakeStorageProvider = new FakeStorageProvider();

        UpdateTechnicianAvatar = new UpdateTechnicianAvatarService(
            fakeTechniciansRepository,
            fakeStorageProvider,
        );
    });
    it('should be able to create a new technician', async () => {
        const technician = await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        await UpdateTechnicianAvatar.execute({
            technicianId: technician.id,
            avatarFilename: 'avatar.jpg',
        });

        expect(technician.avatar).toBe('avatar.jpg');
    });

    it('should be able to update avatar from non existing technician', async () => {
        await expect(
            UpdateTechnicianAvatar.execute({
                technicianId: 'non-existing-technician',
                avatarFilename: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avtar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const technician = await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: 'cris123',
        });

        await UpdateTechnicianAvatar.execute({
            technicianId: technician.id,
            avatarFilename: 'avatar.jpg',
        });

        await UpdateTechnicianAvatar.execute({
            technicianId: technician.id,
            avatarFilename: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

        expect(technician.avatar).toBe('avatar2.jpg');
    });
});
