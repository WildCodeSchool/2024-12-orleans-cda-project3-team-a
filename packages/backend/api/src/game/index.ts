import express from 'express';

import getWalletRouter from './get.wallet';

const gameRouter = express.Router();

gameRouter.use(getWalletRouter);

export default gameRouter;
