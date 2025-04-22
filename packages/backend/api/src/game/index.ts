import express from 'express';

import getInfoParkUser from './get.info-park-user';
import postAddBarrier from './post.add-barrier';

const gameRouter = express.Router();

gameRouter.use(getInfoParkUser);
gameRouter.use(postAddBarrier);

export default gameRouter;
