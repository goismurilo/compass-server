import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Technician from '@modules/technicians/infra/typeorm/entities/Technician';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ITechniciansRepository from '../repositories/ITechniciansRepository';
import { th } from 'date-fns/locale';

interface IRequest {
    technician_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfile {
    constructor(
        @inject('TechniciansRepository')
        private techniciansRepository: ITechniciansRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({
        technician_id,
        name,
        email,
        old_password,
        password,
    }: IRequest): Promise<Technician> {
        const technician = await this.techniciansRepository.findById(technician_id);

        if (!technician) {
            throw new AppError('Technician not found!');
        }

        const technicianWithUpdateEmail = await this.techniciansRepository.findByEmail(email);

        if (technicianWithUpdateEmail && technicianWithUpdateEmail.id !== technician_id) {
            throw new AppError('E-mail already in use!');
        }

        technician.name = name;
        technician.email = email;

        if (password && !old_password) {
            throw new AppError('You need to inform the old password to set a new password!');
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                technician.password,
            );

            if (!checkOldPassword) {
                throw new AppError('Old password does not match!');
            }

            technician.password = await this.hashProvider.generateHash(password);
        }

        await this.techniciansRepository.save(technician);
        return technician;
    }
}

export default UpdateProfile;
