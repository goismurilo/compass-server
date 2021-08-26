/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Technician from '@modules/technicians/infra/typeorm/entities/Technician';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITechniciansRepository from '../repositories/ITechniciansRepository';

interface IRequest {
    technicianId: string;
    avatarFilename?: string;
}

@injectable()
class UpdateTechnicianAvatarService {
    constructor(
        @inject('TechniciansRepository')
        private techniciansRepository: ITechniciansRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) { }

    public async execute({
        technicianId,
        avatarFilename,
    }: IRequest): Promise<Technician> {
        const technician = await this.techniciansRepository.findById(
            technicianId,
        );

        if (!avatarFilename) {
            throw new AppError('Avatar File Name Not Found.', 404);
        }

        if (!technician) {
            throw new AppError(
                'Only authenticated technicians can change avatar.',
                401,
            );
        }

        if (technician.avatar) {
            await this.storageProvider.deleteFile(technician.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        technician.avatar = filename;

        await this.techniciansRepository.save(technician);

        return technician;
    }
}

export default UpdateTechnicianAvatarService;
