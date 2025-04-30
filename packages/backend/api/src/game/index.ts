import express from 'express';

import barrierRouter from './barrier';
import getInfoParkUser from './get.info-park-user';
import getZonesCount from './get.zones-count';

const gameRouter = express.Router();

gameRouter.use(getInfoParkUser);
gameRouter.use(getZonesCount);

gameRouter.use('/barriers', barrierRouter);

export default gameRouter;
