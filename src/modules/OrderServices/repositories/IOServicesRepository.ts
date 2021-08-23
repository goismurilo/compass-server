import OService from '../infra/typeorm/entities/OService';

export default interface IOServicesRepository {
    findByDate(date: Date): Promise<OService | undefined>;
}
