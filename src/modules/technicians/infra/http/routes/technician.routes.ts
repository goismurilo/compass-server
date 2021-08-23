import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/technicians/infra/http/middlewares/ensureAuthenticated';
import TechniciansController from '../controllers/TechniciansController';
import TechniciansAvatarController from '../controllers/TechnicianAvatarController';

const technicianRouter = Router();
const upload = multer(uploadConfig);
const techniciansAvatarController = new TechniciansAvatarController();

const techniciansController = new TechniciansController();

technicianRouter.post('/', techniciansController.create);

technicianRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    techniciansAvatarController.update,
);

export default technicianRouter;
