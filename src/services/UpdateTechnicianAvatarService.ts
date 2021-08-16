import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

import Technician from '../models/Technician';

interface Request {
    technicianId: string;
    avatarFilename?: string;
}

class UpdateTechnicianAvatarService {
    public async execute({
        technicianId,
        avatarFilename,
    }: Request): Promise<Technician> {
        const techniciansRepository = getRepository(Technician);

        const technician = await techniciansRepository.findOne(technicianId);

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

        await techniciansRepository.save(technician);

        return technician;
    }
}

export default UpdateTechnicianAvatarService;
