// import AppError from '@shared/errors/AppError';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';
import FakeTechnicianTokensRepository from '../repositories/fakes/FakeTechnicianTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakeTechniciansRepository: FakeTechniciansRepository;
let fakeTechnicianTokensRepository: FakeTechnicianTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeTechniciansRepository = new FakeTechniciansRepository();
        fakeTechnicianTokensRepository = new FakeTechnicianTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            fakeTechniciansRepository,
            fakeTechnicianTokensRepository,
            fakeHashProvider,
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

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            password: '123123',
            token,
        });

        const updateTechnician = await fakeTechniciansRepository.findById(
            technician.id,
        );

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updateTechnician?.password).toBe('123123');
    });
});
