import express from 'express';

import getMeRouter from './get.me';
import postLoginRouter from './post.login';
import postLogoutRouter from './post.logout';
import postRegisterRouter from './post.register';

const authRouter = express.Router();
authRouter.use(getMeRouter);
authRouter.use(postLoginRouter);
authRouter.use(postRegisterRouter);
authRouter.use(postLogoutRouter);

export default authRouter;
