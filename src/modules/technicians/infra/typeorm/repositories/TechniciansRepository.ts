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
        const technician = await this.ormRepository.findOne(id);

        return technician;
    }

    public async findByEmail(email: string): Promise<Technician | undefined> {
        const technician = await this.ormRepository.findOne({
            where: email,
        });

        return technician;
    }

    public async create(userData: ICreateTechnicianDTO): Promise<Technician> {
        const orderService = this.ormRepository.create(userData);

        await this.ormRepository.save(orderService);

        return orderService;
    }

    public async save(technician: Technician): Promise<Technician> {
        return this.ormRepository.save(technician);
    }
}

export default TechniciansRepository;
