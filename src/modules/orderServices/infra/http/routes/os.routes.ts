import { Router } from 'express';

import ensureAuthenticated from '@modules/technicians/infra/http/middlewares/ensureAuthenticated';
import OrderServicesController from '../controllers/OrderServicesController';

const osRouter = Router();
const orderServicesController = new OrderServicesController();

osRouter.use(ensureAuthenticated);

// osRouter.get('/', async (request, response) => {
//     const orderServicesRepository = new OServicesRepository();
//     const oServices = await orderServicesRepository.find();

//     return response.json(oServices);
// });

osRouter.post('/', orderServicesController.create);

export default osRouter;
