import express from 'express';

import getInfoParkUser from './get.info-park-user';

const gameRouter = express.Router();

gameRouter.use(getInfoParkUser);

export default gameRouter;
