import express from 'express';

import authRouter from './auth';
import gameRouter from './game';
import authGuard from './middlewares/auth.guard';
import authMiddleware from './middlewares/auth.middlewarre';
import getParkIdMiddleware from './middlewares/get.ParkId.middleware';

const router = express.Router();

router.use(authMiddleware);
router.use('/auth', authRouter);

router.use(authGuard);
router.use(getParkIdMiddleware);
router.use('/game', gameRouter);

export default router;
