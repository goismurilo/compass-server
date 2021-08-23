import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import Technician from '@modules/technicians/infra/typeorm/entities/Technician';
import ITechniciansRepository from '../repositories/ITechniciansRepository';

interface IRequest {
    technicianId: string;
    avatarFilename?: string;
}

class UpdateTechnicianAvatarService {
    // eslint-disable-next-line prettier/prettier
    constructor(private techniciansRepository: ITechniciansRepository) { }

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
            const technicianAvatarFilePath = path.join(
                uploadConfig.directory,
                technician.avatar,
            );
            const technicianAvatarFileExists = await fs.promises.stat(
                technicianAvatarFilePath,
            );

            if (technicianAvatarFileExists) {
                await fs.promises.unlink(technicianAvatarFilePath);
            }
        }

        technician.avatar = avatarFilename;

        await this.techniciansRepository.save(technician);

        return technician;
    }
}

export default UpdateTechnicianAvatarService;
