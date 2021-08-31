/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';


// import Technician from '@modules/technicians/infra/typeorm/entities/Technician';

import AppError from '@shared/errors/AppError';
import ITechniciansRepository from '../repositories/ITechniciansRepository';
import ITechnicianTokensRepository from '../repositories/ITechnicianTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('TechnicianRepository')
        private techniciansRepository: ITechniciansRepository,

        @inject('TechnicianTokensRepository')
        private technicianTokensRepository: ITechnicianTokensRepository,
    ) { }

    public async execute({ token, password }: IRequest): Promise<void> {
        const technicianToken = await this.technicianTokensRepository.findByToken(token);

        if (!technicianToken) {
            throw new AppError('Technician token does not exists');
        }

        const technician = await this.techniciansRepository.findById(technicianToken.technician_id);

        if (!technician) {
            throw new AppError('Technician does not exists');
        }

        technician.password = password;

        await this.techniciansRepository.save(technician);
    }
}

export default ResetPasswordService;