import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeTechniciansRepository from '../repositories/fakes/FakeTechniciansRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmailService', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeTechniciansRepository,
            fakeMailProvider,
        );

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
        const fakeTechniciansRepository = new FakeTechniciansRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeTechniciansRepository,
            fakeMailProvider,
        );

        await expect(
            sendForgotPasswordEmail.execute({
                email: 'cristovao@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
