import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/ListSpecificationController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.get(
    '/',
    ensureAuthenticated,
    listSpecificationController.handle
);

specificationsRoutes.post(
    '/',
    ensureAuthenticated,
    createSpecificationController.handle
);

export { specificationsRoutes };
