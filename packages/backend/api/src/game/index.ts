import express from 'express';

import getBarrier from './get.barrier';
import getInfoParkUser from './get.info-park-user';
import postAddBarrier from './post.add-barrier';

const gameRouter = express.Router();

gameRouter.use(getInfoParkUser);
gameRouter.use(getBarrier);
gameRouter.use(postAddBarrier);

export default gameRouter;
