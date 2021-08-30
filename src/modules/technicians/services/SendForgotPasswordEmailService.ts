/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import Technician from '@modules/technicians/infra/typeorm/entities/Technician';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
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
        this.mailProvider.sendMail(email, 'Pedido de Recuperação de Senha')
    }
}

export default SendForgotPasswordEmailService;
