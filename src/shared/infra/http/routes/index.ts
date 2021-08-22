import { Router } from 'express';

import clientRouter from '@modules/clients/infra/http/routes/client.routes';
import osRouter from '@modules/orderServices/infra/http/routes/os.routes';
import secretaryRouter from '@modules/secretaries/infra/http/secretary.routes';
import technicianRouter from '@modules/technicians/infra/http/routes/technician.routes';
import serviceRouter from '@modules/servicesOS/infra/http/service.routes';
import statusRouter from '@modules/statusOS/infra/http/status.routes';
import sessionsRouter from '@modules/technicians/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/client', clientRouter);
routes.use('/os', osRouter);
routes.use('/secretary', secretaryRouter);
routes.use('/service', serviceRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/status', statusRouter);
routes.use('/technician', technicianRouter);

export default routes;
