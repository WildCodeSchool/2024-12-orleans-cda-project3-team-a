import express from 'express';

import parkIdMiddleware from '@/middlewares/park-id.middleware';

import barrierRouter from './barrier';
import getCreaturesRoute from './get.creatures';
import getDecorations from './get.decorations';
import getEnclosures from './get.enclosures';
import getParkUser from './get.park-user';
import getZonesCount from './get.zones-count';
import parkRouter from './park';
import postBuyCreature from './post.buy-creature';

const gameRouter = express.Router();

gameRouter.use('/park', parkRouter);
gameRouter.use(parkIdMiddleware);
gameRouter.use(getParkUser);
gameRouter.use(getZonesCount);
gameRouter.use('/barriers', barrierRouter);
gameRouter.use(getEnclosures);
gameRouter.use(getDecorations);
gameRouter.use(getCreaturesRoute);
gameRouter.use(postBuyCreature);

export default gameRouter;
