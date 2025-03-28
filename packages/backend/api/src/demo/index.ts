import express from 'express';

import deleteDemoRouter from './delete';
import getDemoRouter from './get';
import postDemoRouter from './post';

const demoRouter = express.Router();

demoRouter.use(getDemoRouter);
demoRouter.use(postDemoRouter);
demoRouter.use(deleteDemoRouter);

export default demoRouter;
