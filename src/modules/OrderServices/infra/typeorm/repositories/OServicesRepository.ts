import { getRepository, Repository } from 'typeorm';

import IOServicesRepository from '@modules/orderServices/repositories/IOServicesRepository';

import OService from '@modules/orderServices/infra/typeorm/entities/OService';
import ICreateOrderServicesDto from '@modules/orderServices/dtos/ICreateOrderServicesDTO';

class OServicesRepository implements IOServicesRepository {
    private ormRepository: Repository<OService>;

    constructor() {
        this.ormRepository = getRepository(OService);
    }

    public async findByDate(date: Date): Promise<OService | undefined> {
        const findOrderService = await this.ormRepository.findOne({
            where: { date },
        });

        return findOrderService;
    }

    public async create({
        clientIDFK,
        technicianIDFK,
        secretaryIDFK,
        serviceIDFK,
        obsSecretary,
        statusIDFK,
        isClosed,
    }: ICreateOrderServicesDto): Promise<OService> {
        const orderService = await this.ormRepository.create({
            clientIDFK,
            technicianIDFK,
            secretaryIDFK,
            serviceIDFK,
            obsSecretary,
            statusIDFK,
            isClosed,
        });

        await this.ormRepository.save(orderService);

        return orderService;
    }
}

export default OServicesRepository;
