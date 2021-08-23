import { EntityRepository, Repository } from 'typeorm';

import IOServicesRepository from '@modules/orderServices/repositories/IOServicesRepository';

import OService from '@modules/orderServices/infra/typeorm/entities/OService';

@EntityRepository(OService)
// eslint-disable-next-line prettier/prettier
class OServicesRepository extends Repository<OService> implements IOServicesRepository {
    public async findByDate(date: Date): Promise<OService | undefined> {
        const findOrderService = await this.findOne({
            where: { date },
        });

        return findOrderService;
    }
}

export default OServicesRepository;
