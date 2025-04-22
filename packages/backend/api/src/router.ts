import express from 'express';

import authRouter from './auth';
import demoRouter from './demo';
import gameRouter from './game';

const router = express.Router();

router.use('/demo', demoRouter);
router.use('/game', gameRouter);
router.use('/auth', authRouter);

export default router;
