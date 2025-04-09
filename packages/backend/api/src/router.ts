import express from 'express';

import authRouter from './auth';
import demoRouter from './demo';

const router = express.Router();

router.use('/demo', demoRouter);
router.use('/auth', authRouter);

export default router;
