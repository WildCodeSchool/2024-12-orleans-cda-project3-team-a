import express from 'express';

import getCreaturesRoute from './get.creatures';
import postFeedCreature from './post.feed-creature';
import postBuyCreature from './post.buy-creature';

const creatureRouter = express.Router();

creatureRouter.use(getCreaturesRoute);
creatureRouter.use(postFeedCreature);
creatureRouter.use(postBuyCreature);

export default creatureRouter;
