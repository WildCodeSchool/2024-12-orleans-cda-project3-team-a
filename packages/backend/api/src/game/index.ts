import express from 'express';

import getInfoCreatures from './get.info-creature';
import getInfoParkUser from './get.info-park-user';
import getZonesCount from './get.zones-count';

const gameRouter = express.Router();

gameRouter.use(getInfoParkUser);
gameRouter.use(getZonesCount);
gameRouter.use(getInfoCreatures);
export default gameRouter;
