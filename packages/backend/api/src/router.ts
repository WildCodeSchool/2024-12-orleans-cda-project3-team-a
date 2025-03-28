import express from 'express';

import demoRouter from './demo';

const router = express.Router();

router.use('/demo', demoRouter);

export default router;
