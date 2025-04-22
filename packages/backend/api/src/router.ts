import express from 'express';

import authRouter from './auth';
import demoRouter from './demo';
import gameRouter from './game';
import authMiddleware from './middlewares/auth.middlewarre';

const router = express.Router();

router.use(authMiddleware);
router.use('/auth', authRouter);
router.use('/demo', demoRouter);
router.use('/game', gameRouter);

export default router;
