import { getRepository, Repository } from 'typeorm';

import ICreateTechnicianDTO from '@modules/technicians/dtos/ICreateTechnicianDTO';
import ITechniciansRepository from '@modules/technicians/repositories/ITechniciansRepository';

import Technician from '@modules/technicians/infra/typeorm/entities/Technician';

class TechniciansRepository implements ITechniciansRepository {
    private ormRepository: Repository<Technician>;

    constructor() {
        this.ormRepository = getRepository(Technician);
    }

    public async findById(id: string): Promise<Technician | undefined> {
        const findTechnician = await this.ormRepository.findOne(id);

        return findTechnician;
    }

    public async findByEmail(email: string): Promise<Technician | undefined> {
        const findTechnician = await this.ormRepository.findOne({
            where: email,
        });

        return findTechnician;
    }

    public async create(userData: ICreateTechnicianDTO): Promise<Technician> {
        const technician = this.ormRepository.create(userData);

        await this.ormRepository.save(technician);

        return technician;
    }

    public async save(technician: Technician): Promise<Technician> {
        return this.ormRepository.save(technician);
    }
}

export default TechniciansRepository;
