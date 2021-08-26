/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Technician from '@modules/technicians/infra/typeorm/entities/Technician';

import ITechniciansRepository from '../repositories/ITechniciansRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateTechnicianService {
    constructor(
        @inject('TechnicianRepository')
        private techniciansRepository: ITechniciansRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({
        name,
        email,
        password,
    }: IRequest): Promise<Technician> {
        const checkClientExists = await this.techniciansRepository.findByEmail(
            email,
        );

        if (checkClientExists) {
            throw new AppError('Email address alredy used.', 401);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const technician = await this.techniciansRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return technician;
    }
}

export default CreateTechnicianService;
