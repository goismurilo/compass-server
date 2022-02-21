import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/technicians/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const upload = multer(uploadConfig);

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
