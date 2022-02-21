import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Technician from '@modules/technicians/infra/typeorm/entities/Technician';
import ITechniciansRepository from '../repositories/ITechniciansRepository';

interface IRequest {
    technician_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('TechniciansRepository')
        private techniciansRepository: ITechniciansRepository,
    ) { }

    public async execute({
        technician_id,
    }: IRequest): Promise<Technician> {
        const technician = await this.techniciansRepository.findById(technician_id);

        if (!technician) {
            throw new AppError('Technician not found!');
        }

        return technician;
    }
}

export default ShowProfileService;
