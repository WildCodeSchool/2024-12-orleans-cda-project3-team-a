import express from 'express';

import parkIdMiddleware from '@/middlewares/park-id.middleware';

import getPark from './get.park';
import dataModify from './post.data-modify';
import postPark from './post.park';

const parkRouter = express.Router();

parkRouter.use(postPark);
parkRouter.use(dataModify);
parkRouter.use(parkIdMiddleware);
parkRouter.use(getPark);

export default parkRouter;
