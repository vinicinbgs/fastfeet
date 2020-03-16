import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import CouriersController from './app/controllers/CouriersController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);

routes.post('/couriers', CouriersController.store);
routes.get('/couriers', CouriersController.index);
routes.get('/couriers/:id', CouriersController.show);
routes.put('/couriers/:id', CouriersController.update);
routes.delete('/couriers/:id', CouriersController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
