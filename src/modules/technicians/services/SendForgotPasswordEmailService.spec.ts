import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';
import FakeTechnicianTokensRepository from '../repositories/fakes/FakeTechnicianTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeTechniciansRepository: FakeTechniciansRepository;
let fakeMailProvider: FakeMailProvider;
let fakeTechnicianTokensRepository: FakeTechnicianTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
    beforeEach(() => {
        fakeTechniciansRepository = new FakeTechniciansRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeTechnicianTokensRepository = new FakeTechnicianTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeTechniciansRepository,
            fakeMailProvider,
            fakeTechnicianTokensRepository,
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: '123123',
        });

        await sendForgotPasswordEmail.execute({
            email: 'cristovao@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing technician password', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'cristovao@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(
            fakeTechnicianTokensRepository,
            'generate',
        );

        const technician = await fakeTechniciansRepository.create({
            name: 'Cristovao',
            email: 'cristovao@gmail.com',
            password: '123123',
        });

        await sendForgotPasswordEmail.execute({
            email: 'cristovao@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(technician.id);
    });
});
