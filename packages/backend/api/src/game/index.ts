import express from 'express';

import parkIdMiddleware from '@/middlewares/park-id.middleware';

import barrierRouter from './barrier';
import creatureRouter from './creature';
import getDecorations from './get.decorations';
import getEnclosures from './get.enclosures';
import getLeaderboardRoute from './get.leaderboard';
import getParkUser from './get.park-user';
import getZonesCount from './get.zones-count';
import parkRouter from './park';
import visitorRouter from './visitor';

const gameRouter = express.Router();

gameRouter.use('/park', parkRouter);
gameRouter.use(parkIdMiddleware);
gameRouter.use(getParkUser);
gameRouter.use(getZonesCount);
gameRouter.use('/barriers', barrierRouter);
gameRouter.use(getEnclosures);
gameRouter.use(getDecorations);
gameRouter.use('/creature', creatureRouter);
gameRouter.use('/visitors', visitorRouter);
gameRouter.use(getLeaderboardRoute);
export default gameRouter;
