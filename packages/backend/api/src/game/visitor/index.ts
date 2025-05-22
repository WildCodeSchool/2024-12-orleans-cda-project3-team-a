import express from 'express';

import getVisitorsRoute from './get.visitors';

const visitorRouter = express.Router();

visitorRouter.use(getVisitorsRoute);

export default visitorRouter;
