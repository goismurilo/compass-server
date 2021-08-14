import { Router } from 'express';

import clientRouter from './client.routes';
import osRouter from './os.routes';
import secretaryRouter from './secretary.routes';
import technicianRouter from './technician.routes';
import serviceRouter from './service.routes';
import statusRouter from './status.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/client', clientRouter);
routes.use('/os', osRouter);
routes.use('/secretary', secretaryRouter);
routes.use('/service', serviceRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/status', statusRouter);
routes.use('/technician', technicianRouter);

export default routes;
