import express from 'express';

import parkIdMiddleware from '@/middlewares/park-id.middleware';

import barrierRouter from './barrier';
import getDecorations from './get.decorations';
import getEnclosures from './get.enclosures';
import getCreaturesRoute from './get.creatures-route';
import getParkUser from './get.park-user';
import getZonesCount from './get.zones-count';
import parkRouter from './park';

const gameRouter = express.Router();

gameRouter.use('/park', parkRouter);
gameRouter.use(parkIdMiddleware);
gameRouter.use(getParkUser);
gameRouter.use(getZonesCount);
gameRouter.use('/barriers', barrierRouter);
gameRouter.use(getEnclosures);
gameRouter.use(getDecorations);
gameRouter.use(getCreaturesRoute);

export default gameRouter;
