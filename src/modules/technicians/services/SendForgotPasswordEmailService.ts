import { inject, injectable } from 'tsyringe';
import path from 'path';

// import AppError from '@shared/errors/AppError';

// import Technician from '@modules/technicians/infra/typeorm/entities/Technician';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ITechniciansRepository from '../repositories/ITechniciansRepository';
import ITechnicianTokensRepository from '../repositories/ITechnicianTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('TechniciansRepository')
        private techniciansRepository: ITechniciansRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('TechnicianTokensRepository')
        private technicianTokensRepository: ITechnicianTokensRepository,
    ) { }

    public async execute({ email }: IRequest): Promise<void> {
        const technician = await this.techniciansRepository.findByEmail(email);

        if (!technician) {
            throw new AppError('Technician does not exists');
        }

        const { token } = await this.technicianTokensRepository.generate(technician.id);

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await this.mailProvider.sendMail({
            to: {
                name: technician.name,
                email: technician.email,
            },
            subject: '[CompassOS] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: technician.name,
                    link: `https://localhost:3000/reset_password?token=${token}`,
                }
            }
        });
    }
}

export default SendForgotPasswordEmailService;
