import { Router } from 'express';

import clientRouter from './client.routes';
import osRouter from './os.routes';
import secretaryRouter from './secretary.routes';
import technicianRouter from './technician.routes';
import serviceRouter from './service.routes';
import statusRouter from './status.routes';

const routes = Router();

routes.use('/os', osRouter);
routes.use('/client', clientRouter);
routes.use('/secretary', secretaryRouter);
routes.use('/technician', technicianRouter);
routes.use('/service', serviceRouter);
routes.use('/status', statusRouter);

export default routes;
