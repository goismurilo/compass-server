import { getRepository, Repository } from 'typeorm';

import ITechnicianTokensRepository from '@modules/technicians/repositories/ITechnicianTokensRepository';

import TechnicianToken from '@modules/technicians/infra/typeorm/entities/TechnicianToken';

class TechnicianTokensRepository implements ITechnicianTokensRepository {
    private ormRepository: Repository<TechnicianToken>;

    constructor() {
        this.ormRepository = getRepository(TechnicianToken);
    }

    public async findByToken(
        token: string,
    ): Promise<TechnicianToken | undefined> {
        const technicianToken = await this.ormRepository.findOne({
            where: { token },
        });

        return technicianToken;
    }

    // eslint-disable-next-line camelcase
    public async generate(technician_id: string): Promise<TechnicianToken> {
        const technicianToken = this.ormRepository.create({
            technician_id,
        });

        await this.ormRepository.save(technicianToken);

        return technicianToken;
    }
}

export default TechnicianTokensRepository;
