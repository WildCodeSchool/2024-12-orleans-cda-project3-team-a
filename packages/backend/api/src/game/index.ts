import express from 'express';

import getInfoCreatures from './get.info-creature';
import getInfoParkUser from './get.info-park-user';

const gameRouter = express.Router();

gameRouter.use(getInfoParkUser);
gameRouter.use(getInfoCreatures);
export default gameRouter;
