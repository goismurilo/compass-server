import { uuid } from 'uuidv4';

import ICreateTechnicianDTO from '@modules/technicians/dtos/ICreateTechnicianDTO';
import ITechniciansRepository from '@modules/technicians/repositories/ITechniciansRepository';

import Technician from '@modules/technicians/infra/typeorm/entities/Technician';

class TechniciansRepository implements ITechniciansRepository {
    private technicians: Technician[] = [];

    public async findById(id: string): Promise<Technician | undefined> {
        const findTechnician = this.technicians.find(
            technician => technician.id === id,
        );

        return findTechnician;
    }

    public async findByEmail(email: string): Promise<Technician | undefined> {
        const findTechnician = this.technicians.find(
            technician => technician.email === email,
        );

        return findTechnician;
    }

    public async create(userData: ICreateTechnicianDTO): Promise<Technician> {
        const technician = new Technician();

        Object.assign(technician, { id: uuid() }, userData);

        this.technicians.push(technician);

        return technician;
    }

    public async save(technician: Technician): Promise<Technician> {
        const findIndex = this.technicians.findIndex(
            findTechnician => findTechnician.id === technician.id,
        );

        this.technicians[findIndex] = technician;

        return technician;
    }
}

export default TechniciansRepository;
