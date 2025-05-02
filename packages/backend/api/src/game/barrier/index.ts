import express from 'express';

import getBarriersRoute from './get.barriers-route';
import postBarrier from './post.barrier';

const barrierRouter = express.Router();

barrierRouter.use(getBarriersRoute);
barrierRouter.use(postBarrier);

export default barrierRouter;
