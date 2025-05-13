import express from 'express';

import parkIdMiddleware from '@/middlewares/park-id.middleware';

import getPark from './get.park';
import postPark from './post.park';

const parkRouter = express.Router();

parkRouter.use(postPark);
parkRouter.use(parkIdMiddleware);
parkRouter.use(getPark);

export default parkRouter;
