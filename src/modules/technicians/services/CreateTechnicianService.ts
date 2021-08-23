/* eslint-disable prettier/prettier */
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Technician from '@modules/technicians/infra/typeorm/entities/Technician';

import ITechniciansRepository from '../repositories/ITechniciansRepository';

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

        const hashedPassword = await hash(password, 8);

        const technician = await this.techniciansRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return technician;
    }
}

export default CreateTechnicianService;
