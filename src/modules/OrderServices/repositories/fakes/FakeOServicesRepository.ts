import { uuid } from 'uuidv4';

import IOServicesRepository from '@modules/orderServices/repositories/IOServicesRepository';

import OService from '@modules/orderServices/infra/typeorm/entities/OService';
import ICreateOrderServicesDto from '@modules/orderServices/dtos/ICreateOrderServicesDTO';

class OServicesRepository implements IOServicesRepository {
    private orderServices: OService[] = [];

    public async findByDate(date: Date): Promise<OService | undefined> {
        const findOrderService = this.orderServices.find(
            orderService => orderService.createdAt === date,
        );

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
        const orderService = new OService();

        Object.assign(orderService, {
            id: uuid(),
            clientIDFK,
            technicianIDFK,
            secretaryIDFK,
            serviceIDFK,
            obsSecretary,
            statusIDFK,
            isClosed,
        });

        this.orderServices.push(orderService);

        return orderService;
    }
}

export default OServicesRepository;
