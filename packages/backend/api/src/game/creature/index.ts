import express from 'express';

import getCreaturesRoute from './get.creatures';
import getHasCreature from './get.has-creatures';
import postBuyCreature from './post.buy-creature';
import postFeedAll from './post.feed-all';
import postFeedCreature from './post.feed-creature';

const creatureRouter = express.Router();

creatureRouter.use(getCreaturesRoute);
creatureRouter.use(postFeedCreature);
creatureRouter.use(postBuyCreature);
creatureRouter.use(getHasCreature);
creatureRouter.use(postFeedAll);

export default creatureRouter;
