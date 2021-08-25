import FakeOServicesRepository from '../repositories/fakes/FakeOServicesRepository';

import CreateOSService from './CreateOSService';

describe('CreateOSService', () => {
    it('should be able to create a new OS service', async () => {
        const fakeOServices = new FakeOServicesRepository();
        const createOrderService = new CreateOSService(fakeOServices);

        const orderService = await createOrderService.execute({
            clientIDFK: '12312',
            technicianIDFK: '12312',
            secretaryIDFK: '12312',
            serviceIDFK: '12312',
            obsSecretary: '12312',
            statusIDFK: '12312',
            isClosed: false,
        });

        expect(orderService).toHaveProperty('id');
    });
});
