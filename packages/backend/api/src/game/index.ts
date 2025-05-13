import express from 'express';

import parkIdMiddleware from '@/middlewares/park-id.middleware';

import barrierRouter from './barrier';
import getInfoParkUser from './get.info-park-user';
import getZonesCount from './get.zones-count';
import parkRouter from './park';
import getCreatureRoute from './get.creature-route';

const gameRouter = express.Router();

gameRouter.use('/park', parkRouter);
gameRouter.use(parkIdMiddleware);
gameRouter.use(getInfoParkUser);
gameRouter.use(getZonesCount);
gameRouter.use('/barriers', barrierRouter);
gameRouter.use(getCreatureRoute);

export default gameRouter;
