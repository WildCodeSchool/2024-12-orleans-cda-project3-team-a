import express from 'express';

import getBarriersRoute from './get.barriers-route';
import getInfoParkUser from './get.info-park-user';
import getZonesCount from './get.zones-count';
import postBarrier from './post.barrier';

const gameRouter = express.Router();

gameRouter.use(getInfoParkUser);
gameRouter.use(getZonesCount);
gameRouter.use(getBarriersRoute);
gameRouter.use(postBarrier);

export default gameRouter;
