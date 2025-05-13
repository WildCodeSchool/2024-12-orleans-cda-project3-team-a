import express from 'express';

import parkIdMiddleware from '@/middlewares/park-id.middleware';

import barrierRouter from './barrier';
import getDecorations from './get.decorations';
import getEnclos from './get.enclos';
import getInfoParkUser from './get.info-park-user';
import getZonesCount from './get.zones-count';
import parkRouter from './park';

const gameRouter = express.Router();

gameRouter.use('/park', parkRouter);
gameRouter.use(parkIdMiddleware);
gameRouter.use(getInfoParkUser);
gameRouter.use(getZonesCount);
gameRouter.use('/barriers', barrierRouter);
gameRouter.use(getEnclos);
gameRouter.use(getDecorations);

export default gameRouter;
