import express from 'express';

import barrierRouter from './barrier';
import getInfoCreatures from './get.creature';
import getDecorations from './get.decorations';
import getInfoParkUser from './get.info-park-user';
import getZonesCount from './get.zones-count';

const gameRouter = express.Router();

gameRouter.use(getInfoParkUser);
gameRouter.use(getZonesCount);

gameRouter.use('/barriers', barrierRouter);
gameRouter.use(getInfoCreatures);
gameRouter.use(getDecorations);

export default gameRouter;
