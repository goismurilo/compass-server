import Technician from '../infra/typeorm/entities/Technician';
import ICreateTechnicianDTO from '../dtos/ICreateTechnicianDTO';

export default interface ITechniciansRepository {
    findById(id: string): Promise<Technician | undefined>;
    findByEmail(email: string): Promise<Technician | undefined>;
    create(data: ICreateTechnicianDTO): Promise<Technician>;
    save(technician: Technician): Promise<Technician | undefined>;
}
