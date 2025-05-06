import express from 'express';

import getInfoParkUser from './get.info-park-user';
import getZonesCount from './get.zones-count';
import getCreatureRoute from './get.creature-route';

const gameRouter = express.Router();

gameRouter.use(getInfoParkUser);
gameRouter.use(getZonesCount);
gameRouter.use(getCreatureRoute);

export default gameRouter;
