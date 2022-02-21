import AppError from '@shared/errors/AppError';

import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';
import ShowProfileService from './ShowProfileService';

let fakeTechniciansRepository: FakeTechniciansRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
    beforeEach(() => {
        fakeTechniciansRepository = new FakeTechniciansRepository();

        showProfile = new ShowProfileService(
            fakeTechniciansRepository,
        );
    });
    it('should be able to show the profile', async () => {
        const technician = await fakeTechniciansRepository.create({
            name: 'Dom Pedro II',
            email: 'pedraoipiranga@example.com',
            password: 'cris123',
        });

        const showTechnician = await showProfile.execute({
            technician_id: technician.id,
        });

        expect(showTechnician.name).toBe('Dom Pedro II');
        expect(showTechnician.email).toBe('pedraoipiranga@example.com');
    });

    it('should not be able to show the profile from non-existing technician', async () => {
        expect(showProfile.execute({
            technician_id: 'usuario-não-existente'
        }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
