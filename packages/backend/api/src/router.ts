import express from 'express';

// import authRouter from './auth';
import gameRouter from './game';

const router = express.Router();

// router.use('/auth', authRouter);
router.use('/game', gameRouter);

export default router;
