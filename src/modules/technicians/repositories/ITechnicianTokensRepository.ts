/* eslint-disable camelcase */
import TechnicianToken from '../infra/typeorm/entities/TechnicianToken';

export default interface IFakeTechnicianTokensRepository {
    generate(user_id: string): Promise<TechnicianToken>;
    findByToken(token: string): Promise<TechnicianToken | undefined>;
}
