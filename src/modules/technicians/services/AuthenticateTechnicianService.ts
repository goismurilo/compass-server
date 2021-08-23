/* eslint-disable prettier/prettier */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';
import Technician from '@modules/technicians/infra/typeorm/entities/Technician';
import ITechniciansRepository from '../repositories/ITechniciansRepository';

interface IRequest {
    email: string;
    password?: string;
}

interface IResponse {
    technician: Technician;
    token: string;
}

@injectable()
class AuthenticateTechnicianService {
    constructor(
        @inject('TechniciansRepository')
        private techniciansRepository: ITechniciansRepository,
    ) { }

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const technician = await this.techniciansRepository.findByEmail(email);

        if (!technician || !password) {
            throw new AppError('Incorrect email/password combination!', 401);
        }

        const passwordMachted = await compare(password, technician.password);

        if (!passwordMachted) {
            throw new AppError('Incorrect email/password combination!', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: technician.id,
            expiresIn,
        });

        return { technician, token };
    }
}

export default AuthenticateTechnicianService;
