import OService from '../infra/typeorm/entities/OService';

import ICreateOrderServicesDto from '../dtos/ICreateOrderServicesDTO';

export default interface IOServicesRepository {
    create(data: ICreateOrderServicesDto): Promise<OService>;
    findByDate(date: Date): Promise<OService | undefined>;
}
