/* eslint-disable camelcase */
import IFakeTechnicianTokensRepository from '@modules/technicians/repositories/ITechnicianTokensRepository';

import TechnicianToken from '@modules/technicians/infra/typeorm/entities/TechnicianToken';
import { uuid } from 'uuidv4';

class FakeTechnicianTokensRepository
    // eslint-disable-next-line prettier/prettier
    implements IFakeTechnicianTokensRepository {
    private technicianTokens: TechnicianToken[] = [];

    public async generate(technician_id: string): Promise<TechnicianToken> {
        const technicianToken = new TechnicianToken();

        Object.assign(technicianToken, {
            id: uuid(),
            token: uuid(),
            technician_id,
            createdAt: new Date(),
            updateddAt: new Date(),
        });

        this.technicianTokens.push(technicianToken);

        return technicianToken;
    }

    public async findByToken(
        token: string,
    ): Promise<TechnicianToken | undefined> {
        const technicianToken = this.technicianTokens.find(
            findToken => findToken.token === token,
        );

        return technicianToken;
    }
}

export default FakeTechnicianTokensRepository;
