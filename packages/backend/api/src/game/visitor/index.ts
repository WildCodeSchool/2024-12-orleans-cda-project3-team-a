import express from 'express';

import getVisitors from './get.visitors';

const visitorRouter = express.Router();

visitorRouter.use(getVisitors);

export default visitorRouter;
