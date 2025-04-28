import express from 'express';

import getInfoParkUser from './get.info-park-user';
import getZonesCount from './get.zones-count';

const gameRouter = express.Router();

gameRouter.use(getInfoParkUser);
gameRouter.use(getZonesCount);

export default gameRouter;
