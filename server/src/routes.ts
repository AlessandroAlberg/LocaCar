import express from 'express';

import VehiclesController from './controllers/VehiclesController';

const routes = express.Router();
const vehiclesController = new VehiclesController();

routes.post('/vehicles', vehiclesController.create);
routes.get('/vehicles', vehiclesController.index);
routes.get('/vehicles/:id', vehiclesController.show);
routes.put('/vehicles/:id', vehiclesController.update);
routes.delete('/vehicles/:id', vehiclesController.delete);


export default routes;