// import AppError from '@shared/errors/AppError';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';
import FakeTechnicianTokensRepository from '../repositories/fakes/FakeTechnicianTokensRepository';

import ResetPasswordService from './ResetPasswordService';

let fakeTechniciansRepository: FakeTechniciansRepository;
let fakeTechnicianTokensRepository: FakeTechnicianTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeTechniciansRepository = new FakeTechniciansRepository();
        fakeTechnicianTokensRepository = new FakeTechnicianTokensRepository();

        resetPassword = new ResetPasswordService(
            fakeTechniciansRepository,
            fakeTechnicianTokensRepository,
        );
    });

    it('should be able to reset password', async () => {
        const technician = await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: '123126',
        });

        const { token } = await fakeTechnicianTokensRepository.generate(
            technician.id,
        );

        await resetPassword.execute({
            password: '123123',
            token,
        });

        const updateTechnician = await fakeTechniciansRepository.findById(
            technician.id,
        );

        expect(updateTechnician?.password).toBe('123123');
    });
});
