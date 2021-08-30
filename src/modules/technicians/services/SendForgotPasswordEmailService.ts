/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import Technician from '@modules/technicians/infra/typeorm/entities/Technician';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import ITechniciansRepository from '../repositories/ITechniciansRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('TechnicianRepository')
        private techniciansRepository: ITechniciansRepository,

        @inject('IMailProvider')
        private mailProvider: IMailProvider,
    ) { }

    public async execute({ email }: IRequest): Promise<void> {
        const checkTechnicianExists = await this.techniciansRepository.findByEmail(email);

        if (!checkTechnicianExists) {
            throw new AppError('Technician does not exists');
        }

        this.mailProvider.sendMail(email, 'Pedido de Recuperação de Senha')
    }
}

export default SendForgotPasswordEmailService;
