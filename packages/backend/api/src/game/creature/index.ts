import express from 'express';

import getCreaturesRoute from './get.creatures';
import postFeedCreature from './post.feed-creature';

const creatureRouter = express.Router();

creatureRouter.use(getCreaturesRoute);
creatureRouter.use(postFeedCreature);

export default creatureRouter;
